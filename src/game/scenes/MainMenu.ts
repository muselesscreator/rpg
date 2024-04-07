import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
  background: GameObjects.Image;
  title: GameObjects.text;
  startGameBtn: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;

  constructor ()
  {
    super('MainMenu');
  }

  create ()
  {
    this.background = this.add.image(512, 384, 'background');

    this.title = this.add.text(512, 300, 'React Principia Genesis', {
      fontFamily: 'Arial Black', fontSize: 58, color: 'gold',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);
    this.startGameBtn = this.add.text(512, 460, 'Start Game', {
      fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5).setDepth(100).setInteractive();
    this.startGameBtn.on('pointerdown', this.changeScene, this);
    EventBus.emit('current-scene-ready', this);
    this.scene.start('Game');
  }
  
  changeScene ()
  {
    if (this.logoTween)
    {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start('Game');
  }

  moveLogo (vueCallback: ({ x, y }: { x: number, y: number }) => void)
  {
    if (this.logoTween)
    {
      if (this.logoTween.isPlaying())
      {
        this.logoTween.pause();
      }
      else
      {
        this.logoTween.play();
      }
    } 
    else
    {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
        y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if (vueCallback)
          {
            vueCallback({
              x: Math.floor(this.logo.x),
              y: Math.floor(this.logo.y)
            });
          }
        }
      });
    }
  }
}
