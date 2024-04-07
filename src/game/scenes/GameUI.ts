import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import eventsCenter from './EventsCenter';

export class GameUI extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    player: Phaser.GameObjects.Image;
    canvas: HTMLCanvasElement;
    panel: Phaser.GameObjects.Group;
    panelText: Phaser.GameObjects.Text;
    mapContainer: Phaser.GameObjects.Container;

    loadedItems: Phaser.GameObjects.Image[] = [];

    constructor ()
    {
        super({ key: 'GameUI', active: true });
        this.loadItem = this.loadItem.bind(this);
    }

    preload() {
      this.load.image('blue_diamond', 'assets/images/blue_diamond.png');
      this.load.multiatlas('uiElements', 'assets/tilemaps/tiles/uiElements.json', 'assets/tilemaps/tiles');
      this.load.multiatlas('borders', 'assets/tilemaps/tiles/borders.json', 'assets/tilemaps/tiles');
      this.canvas = this.sys.game.canvas;
      this.load.image('red_key', 'assets/images/red_key.png');
    }

    createPanel(
      x: number,
      y: number,
      width: number,
      height: number,
      atlas: string,
      img: string,
    ) {
      const corner = 20;
      const panel = this.add.nineslice(
        x, y,
        atlas, img,
        width, height,
        corner, corner,
        corner, corner,
      );
      panel.setOrigin(0, 0);
      return panel;
    }


  loadItem(itemKey: string) {
    console.log({ addItemMethod: itemKey });
    console.log({ el: this, panel: this.panel, items: this.items });
    const img = this.add.image(0, 50 * this.loadedItems.length, itemKey) as Phaser.GameObjects.Image;
    img.setOrigin(0, 0);
    this.panel.add(img);
    this.loadedItems.push(img);
    console.log({ el: this, panel: this.panel });
    /*
    console.log({ img });
    return img;
    */
  }

  create ()
  {
    this.loadedItems = [];
    const initialGuideText = 'Find the Wizard to be told the way out!';
    const panelY = this.canvas.height - 150;
    this.panel = this.add.group();
    this.panel.add(this.createPanel(0, panelY, this.canvas.width, 150, 'borders', 'panel_01.png'));
    this.panelText = this.add.text(
      10,
      panelY + 10,
      initialGuideText,
      { fontSize: '36px', fill: 'black', wordWrap: { width: 1024 } },
    );

    const panelCamera = this.cameras.add(0, 0, this.canvas.width, this.canvas.height);
    panelCamera.setBounds(0, 0, this.canvas.width, this.canvas.height)
    // panelCamera.ignore(this.mapContainer);

    const gameScene = this.scene.get('Game');
    console.log({ gameScene });
    console.log("Game Scene");

    console.log({ el: this, panel: this.panel });
    const itemImages = {
      key: 'red_key',
      crystal: 'blue_diamond',
    } as { [key: string]: string };
    eventsCenter.on('addItem', (item: string) => {
      console.log({ addItem: item });
      this.loadItem(itemImages[item]);
    }, this);

    eventsCenter.on('setText', (val: string) => {
      console.log({ setText: val });
      this.panelText.setText(val);
    }, this);

    EventBus.emit('current-scene-ready', this);
  }

  changeScene ()
  {
      this.scene.start('GameOver');
  }
}
