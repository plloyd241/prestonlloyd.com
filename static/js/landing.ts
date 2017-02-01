'use strict';

interface Position {
	x: number;
	y: number;
}

class Point {
  pos: Position;
  origin: Position;
  radius: number;
  opacity: number;
  neighbors: Array<Point>;
  ctx: CanvasRenderingContext2D;

  constructor(pos, ctx) {
    this.pos = pos;
    this.origin = pos;
    this.ctx = ctx;

    this.radius = this.setRadius();
    this.opacity = 0;
  }

  setRadius(): number {
    return 2 + Math.random() * 2;
  }

  draw(): void {
    this.drawCircle();
    this.drawLines();
  }

  private drawCircle(): void {
    this.ctx.beginPath();
    this.ctx.arc( this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false );
		this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
		this.ctx.fill();
  }

  private drawLines(): void {
    if( !this.opacity ) return;
    for( let i of this.neighbors ) {
      this.ctx.beginPath();
      this.ctx.moveTo( this.pos.x, this.pos.y );
      this.ctx.lineTo( i.pos.x, i.pos.y );
      this.ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity / 2 + ')';
      this.ctx.stroke();
    }
  }
}

class Hero {

	element : HTMLElement;
	canvas  : HTMLCanvasElement;
	ctx		  : CanvasRenderingContext2D;

	width   : number;
	height  : number;

  mouse   : Position;
  points  : Array<Point>;

	constructor() {
    this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.element = document.getElementById('hero');

    this.canvas = document.getElementById('node-swarm');
    this.setCanvasDimensions();

    this.ctx = this.canvas.getContext('2d');

    this.mouse = {x: 0, y: 0};
    this.points = [];

    this.bindEvents();
		this.createNodes();
    this.startAnimation();
	}

  private bindEvents(): void {
    if( !( 'ontouchstart' in window ) ) {
      window.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
    }
  }

  private setCanvasDimensions(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

	/**
	 * Generate points
	 *
	 * @method createNodes
	 * @return void
	 */
	private createNodes(): void {
		let width20 = this.width / 20;
		let height20 = this.height / 20;

		for(let x = 0; x < this.width; x = x + width20) {
			for(let y = 0; y < this.height; y = y + height20) {
				let posX = x + Math.random() * width20;
				let posY = y + Math.random() * height20;

        let point: Point = new Point({ x: posX, y: posY }, this.ctx);

				this.points.push( point );
			}
		}

		for(let point of this.points) {
			let neighbors: Array<Point> = [];

			for(let point2 of this.points) {
				if(point != point2) {
					let placed = false;

					for(let id = 0; id < 5; id++) {
						if(!placed && neighbors[id] == undefined) {
							neighbors[id] = point2;
							placed = true;
						}
					}

					for(let id = 0; id < 5; id++) {
						if(!placed && this.getDistance( point.pos, point2.pos ) < this.getDistance( point.pos, neighbors[ id ].pos )) {
							neighbors[id] = point2;
							placed = true;
						}
					}
				}
			}

			point.neighbors = neighbors;
		}

		for(let point of this.points) {
      point.draw();
		}
	}

  handleMouseMove(e: Event): void {
    var x, y;

    if( e.pageX || e.pageY ) {
      x = e.pageX;
      y = e.pageY;
    } else if( e.clientX || e.clientY ) {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    this.mouse = {
      x: x,
      y: y
    }
  }

  private startAnimation(): void {
    this.ctx.clearRect( 0, 0, this.width, this.height );
    for(let i of this.points) {
      if ( Math.abs( this.getDistance( this.mouse, i.pos ) ) < 4000 ) {
        i.opacity = 0.6;
      } else if ( Math.abs( this.getDistance( this.mouse, i.pos ) ) < 20000 ) {
        i.opacity = 0.3;
      } else if ( Math.abs( this.getDistance( this.mouse, i.pos ) ) < 40000 ) {
        i.opacity = 0.1;
      } else {
        i.opacity = 0;
      }

      i.draw();
    }

    requestAnimationFrame( this.startAnimation.bind(this) );
  }

	/**
	 * Returns the distance between two points
	 *
	 * @method getDistance
	 * @param Point, Point
	 * @return number
	 */
	private getDistance( point1: Position, point2: Position ): number {
		return Math.pow( point1.x - point2.x, 2 ) + Math.pow( point1.y - point2.y, 2 );
	}

  /**
   * Draws lines to the points neighbors
   *
   * @method drawLines
   * @param Point
   * @return void
   */
  private drawLines( point: Point ): void {
    for( let i in point.neighbors ) {
      this.ctx.beginPath();
      this.ctx.moveTo( point.x, point.y );
      this.ctx.lineTo( i.x, i.y );
      this.ctx.strokeStyle = 'rgba(255, 255, 255)'
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
	(<any>window).Hero = new Hero();
});
