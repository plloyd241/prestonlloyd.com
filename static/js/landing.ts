'use strict';

interface Position {
	x: number;
	y: number;
}

interface Point {
	x: number;
	y: number;
	origin: Position;
	neighbors: Array<Point>;
}

class Hero {

	element : HTMLElement;
	canvas  : HTMLCanvasElement;
	ctx		: CanvasRenderingContext2D;

	width   : number;
	height  : number;
	mouse   : Point;

	constructor() {
		this.element = document.getElementById('hero');
		this.canvas = document.getElementById('hero-canvas');
		this.ctx = this.canvas.getContext('2d');

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.mouse = {
			x: this.width / 2,
			y: this.height / 3
		}

		this.createNodes();
	}

	/**
	 * Generate points
	 *
	 * @method createNodes
	 * @return void
	 */
	private createNodes(): void {
		let points: Array<Point> = [];

		let width20 = this.width / 20;
		let height20 = this.height / 20;

		for(let x = 0; x < this.width; x = x + width20) {
			for(let y = 0; y < this.height; x = x + height20) {
				let posX = x + Math.random() * width20;
				let posY = y + Math.random() * height20;

				let point: Point = {
					x: posX,
					y: posY,
					origin: {
						x: posX,
						y: posY
					},
					neighbors: []
				}

				points.push( point );
			}
		}

		for(let point of points) {
			let neighbors: Array<Point> = [];

			for(let point2 of points) {
				if(point != point2) {
					let placed = false;

					for(let id = 0; id < 5; id++) {
						if(!placed && neighbors[id] == undefined) {
							neighbors[id] = point2;
							placed = true;
						}
					}

					for(let id = 0; id < 5; id++) {
						if(!placed && this.getDistance( point, point2 ) < this.getDistance( point, neighbors[ id ] )) {
							neighbors[id] = point2;
							placed = true;
						}
					}
				}
			}

			point.neighbors = neighbors;
		}

		for(let point of points) {
			this.drawCircle(point);
		}
	}


	/**
	 * Returns the distance between two points
	 *
	 * @method getDistance
	 * @param Point, Point
	 * @return number
	 */
	private getDistance( point1: Point, point2: Point ): number {
		return Math.pow( point1.x - point2.x, 2 ) + Math.pow( point1.y - point2.y, 2 );
	}

	/**
	 * Draws a circle for the given point
	 *
	 * @method drawCircle
	 * @param Point
	 * @return void
	 */
	private drawCircle( point: Point ): void {
		this.ctx.beginPath();

		this.ctx.arc( point.x, point.y, 2 + Math.random() * 2, 0, 2 * Math.PI, false );
		this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
		this.ctx.fill();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	(<any>window).Hero = new Hero();
});
