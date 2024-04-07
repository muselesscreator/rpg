import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from './Player';
import eventsCenter from './EventsCenter';
import tileEvents from './tileEvents';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    player: Phaser.GameObjects.Image;
    layers: Record<string, Phaser.Tilemaps.TilemapLayer>;
    canvas: HTMLCanvasElement;
    panel: Phaser.GameObjects.Group;
    panelText: Phaser.GameObjects.Text;
    playerData: Player;
    mapContainer: Phaser.GameObjects.Container;

    constructor ()
    {
        super({ key: 'Game' });
    }

    preload() {
      this.load.image('dungeonTiles', 'assets/tilemaps/dungeonTokens.png');
      this.load.tilemapTiledJSON('map', 'assets/tilemaps/sampleMap.json');
      this.load.image('player', 'assets/player.png');
      this.canvas = this.sys.game.canvas;
      this.playerData = new Player();
    }

    create ()
    {
      this.add.rectangle(0, 0, 512, 384, 'black').setOrigin(0, 0);
      this.setupLayers();

      this.handleInput();

      EventBus.emit('current-scene-ready', this);
      /*
      eventsCenter.emit('addItem', 'key');
      eventsCenter.emit('addItem', 'crystal');
      */
    }

    setupLayers() {
      this.mapContainer = this.add.container(0, 0);
      const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
      const tiles = map.addTilesetImage('tileset', 'dungeonTiles', 16, 16, 0, 1) as Phaser.Tilemaps.Tileset;
      console.log({ tiles });
      this.layers = {};
      this.layers.path = map.createLayer('Walkable', tiles, 0, 0) as Phaser.Tilemaps.TilemapLayer;
      this.layers.dungeon = map.createLayer('Dungeon', tiles, 0, 0) as Phaser.Tilemaps.TilemapLayer;
      this.layers.object = map.createLayer('Objects', tiles, 0, 0) as Phaser.Tilemaps.TilemapLayer;
      this.layers.cart = map.createLayer('Carts', tiles, 0, 0) as Phaser.Tilemaps.TilemapLayer;
      this.player = this.add.image(this.playerData.x, this.playerData.y, 'player');
      this.layers.tunnel = map.createLayer('Tunnels', tiles, 0, 0) as Phaser.Tilemaps.TilemapLayer;

      [
        this.layers.path,
        this.layers.dungeon,
        this.layers.object,
        this.layers.cart,
        this.player,
        this.layers.tunnel
      ].forEach(v => this.mapContainer.add(v));


      this.camera = this.cameras.add(0, 0, this.canvas.width, this.canvas.height - 150);
      this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.camera.setZoom(5);
      this.camera.centerOn(this.player.x, this.player.y);
    }

    handleInput() {
      if (!this.input.keyboard) {
        return;
      }
      const { keyboard } = this.input;
      keyboard.on('keydown', (event) => {
        const getTiles = (x: number, y: number) => {
          return {
            path: this.layers.path.getTileAtWorldXY(x, y),
            dungeon: this.layers.dungeon.getTileAtWorldXY(x, y),
            object: this.layers.object.getTileAtWorldXY(x, y),
            cart: this.layers.cart.getTileAtWorldXY(x, y),
            tunnels: this.layers.tunnel.getTileAtWorldXY(x, y)
          };
        }


        if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key)){
          return;
        }
        const positionMod = (
          {
            ArrowRight: [16, 0],
            ArrowLeft: [-16, 0],
            ArrowUp: [0, -16],
            ArrowDown: [0, 16]
          } as Record<string, [number, number]>
        )[event.key] as [number, number];
        const newPos = [
          this.playerData.pos[0] + positionMod[0],
          this.playerData.pos[1] + positionMod[1]
        ] as [number, number];
        const tiles = getTiles(...newPos);

        if (tiles.path === null) { return null; }

        const eventsByTerrainType = Object.keys(tileEvents.Game).reduce((acc, key) => {
          const event = tileEvents.Game[key] as any;
          const { terrainType } = event.tileQuery;
          if (!acc[terrainType]) {
            acc[terrainType] = {};
          }
          acc[terrainType][key] = event;
          return acc;
        }, {});
        console.log({ eventsByTerrainType });


        if (tiles.object) {
          const { properties } = tiles.object;
          const { terrainType } = properties;
          if (eventsByTerrainType[terrainType]) {
            const events = eventsByTerrainType[terrainType];
            console.log({ events });
            Object.keys(events).forEach((key) => {
              const event = events[key];
              console.log({ event });
              if (
                Object.keys(event.tileQuery).every(
                  (k) => event.tileQuery[k] === tiles.object.properties[k]
                )
              ) {
                const { needs, has } = event.prerequisites;
                console.log({ event, needs, has, items: this.playerData.items });
                if (
                  (needs || []).every((k: string) => !this.playerData.items.includes(k))
                  && (has || []).every((k: string) => this.playerData.items.includes(k))
                ) {
                  if (event.guideText) {
                    eventsCenter.emit('setText', event.guideText);
                  }
                  if (event.give) {
                    event.give.forEach(({ item }: { item: string }) => {
                      this.playerData.items.push(item);
                      eventsCenter.emit('addItem', item);
                    });
                  }
                }
              }
            });
          }
          /*
          if (terrainType === 'npc' && tiles.object.properties.name === 'wizard') {
            if (!this.playerData.hasKey) {
              eventsCenter.emit('getKey');
              EventBus.emit('showEditor', this);
              this.playerData.hasKey = true;
              return;
            }
          }
          */
          if (['obstacle', 'doorClosed', 'npc'].includes(tiles.object.properties.terrainType)) {
            return; //blocked;
          }
        }
        if (tiles.cart) {
          if (tiles.cart.properties.terrainType === 'obstacle') {
            return; // Blocked
          }
        }
        this.playerData.pos = newPos;
        // console.log({ newPos, playerPos: this.playerData.pos });
        this.player.x = newPos[0];
        this.player.y = newPos[1];
        this.camera.centerOn(this.player.x, this.player.y);
        if (tiles.path.properties.terrainType !== 'ground' && this.playerData.hasKey) {
          this.changeScene();
        }
      });
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
