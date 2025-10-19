import Warp from 'warpjs'

// const svg = document.getElementById('svg-element')
// const warp = new Warp(svg)

// warp.interpolate(4)
// warp.transform(([ x, y ]) => [ x, y, y ])

// let offset = 0
// function animate()
// {
// 	warp.transform(([ x, y, oy ]) => [ 
// 		x, 
// 		(oy + 50 * Math.sin(x / 250 + offset)), 
// 		oy 
// 	])
// 	offset += 0.1
// 	requestAnimationFrame(animate)
// }

// animate()

const svg = document.getElementById('svg-element')
const owarp = new Warp(svg)

// --- Warp function with "random" smoothness ---
function warp(x, oy, t, intensity = 1, pinch = 0.5) {
  const n = oy / 200;        

  let structured =
    (6 * (1 + 0.25 * (n - 0.5))) *
      Math.sin((2 * Math.PI / 140) * x + (0.3 + 2 * n) + 0.02 * t) +
    (3 * (1 - 0.15 * (n - 0.5))) *
      Math.sin((2 * Math.PI / 63) * x + (1.7 - 1.2 * n) + 0.03 * t);

  return {
	  x: x * 20 + 1.5 * structured,
	  y: oy + intensity * structured
  }
}

owarp.interpolate(4)
owarp.transform(([ x, y ]) => [ x, y, x, y ])

let offset = 0
function animate()
{
	owarp.transform(([ x, y, ox, oy ]) => {
		const tf = warp(ox/20, oy, offset, 4);
		return [tf.x, tf.y, ox, oy]
	})
	offset += 1
	requestAnimationFrame(animate)
}

animate()
