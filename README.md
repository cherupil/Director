<img src="/documentation/assets/img/icon.png?raw=true" width="120" style="max-width: 100%;">

# Director
A simple tweening library for animating DOM elements and JavaScript objects.

## Demo
Open the index.html file to view a demo of the essential features.

##Tweens
Director comes with three types of tweens, 'to', 'from', and 'fromTo'. These tweens currently support numeric CSS attributes as well as 2D Transforms. Currently, 2D Translation only supports units as percentages. The animation target can be a single DOM Node, a NodeList, or a JavaScript object.

###to
A 'to' tween will allow you to animate properties from their current state to a specified end state.
```javascript
Director.to(element, { opacity: 0.5 }, { duration: 1, ease: 'linear' })
```

###from
A 'from' tween will allow you to animate properties from a specified state to their current state.
```javascript
Director.from(element, { opacity: 0, translateX: -100 }, { duration: 1, ease: 'easeOutExpo' })
```

###fromTo
A 'fromTo' tween will allow you to animate properties by providing both a beginning state and an ending state.
```javascript
Director.fromTo(element, { opacity: [1, 0], translateY: [100, -100] }, { duration: 1, ease: 'easeInOutQuint' })
```

###stagger
The stagger attribute can be used to stagger the timing of each animated element by a set duration if the target is either a NodeList or an array of JavaScript objects.
```javascript
Director.fromTo(elements, { opacity: [1, 0], translateY: [100, -100] }, { duration: 1, stagger: 0.1, ease: 'easeInOutQuint' })
```

###Event Callbacks
Any tween can use a callback function to execute a function when a tween starts, updates, or completes.
```javascript
Director.to(element, { opacity: 0 }, { duration: 1, ease: 'easeInOutQuint', onStart: () => {
	console.log('tween has started')
} })

Director.to(element, { opacity: 0 }, { duration: 1, ease: 'easeInOutQuint', onUpdate: () => {
	console.log('tween has updated')
} })

Director.to(element, { opacity: 0 }, { duration: 1, ease: 'easeInOutQuint', onComplete: () => {
	console.log('tween has completed')
} })
```

##Eases
Tweens use a linear easing by default. Director supports the following easing functions:
- 'linear'
- 'easeInSine'
- 'easeOutSine'
- 'easeInOutSine'
- 'easeInQuad'
- 'easeOutQuad'
- 'easeInOutQuad'
- 'easeInCubic'
- 'easeOutCubic'
- 'easeInOutCubic'
- 'easeInQuart'
- 'easeOutQuart'
- 'easeInOutQuart'
- 'easeInQuint'
- 'easeOutQuint'
- 'easeInOutQuint'
- 'easeInExpo'
- 'easeOutExpo'
- 'easeInOutExpo'
- 'easeOutSpring'
- 'easeOutBack'

##Scenes
Tie multiple animations together into one choreographed sequence. Create a Scene and use the same tweening syntax to add animations to it. A fourth argument is required in order to set the starting time for the particular tween.

```javascript
const scene = new Director.Scene()
scene.fromTo(elementOne, { scale: [1, 0], opacity: [1, 0] }, { duration: 1, ease: 'easeOutQuint', stagger: 0.1 }, 0)
scene.fromTo(elementTwo, { scale: [0, 1], opacity: [0, 1] }, { duration: 1, ease: 'easeOutQuint' }, 0.25)
scene.play()
```

###Playback Controls
Scenes can be played, paused, and even rewound. Calls to setProgress can allow for more complex functionality like scrubbing through an animation through a range input. The setProgressImmediately method differs from setProgress in that it will also update the current animation state, rather than just setting the progress alone so that an external requestAnimationFrame call can handle the update.

```javascript
scene.play()
scene.pause()
scene.rewind()
scene.setProgress(0.5)
scene.setProgressImmediately(0.75)
```

##Camera
Camera uses IntersectionObserver and a scroll event listener to facilitate controlling a Scene's playback by scroll position. A Camera takes three arguments, an element that will be the scroll target, a scene, and an options object. A Camera object contains its own 'progress' attribute which stores the progress of the scene.

Using the 'pinned' option assume that the target element is using 'position: sticky;' and automatically calculates the height of the target's parent so that all Camera sequences playback at the same speed, regardless of duration.

The 'beginOnIntersection' option will force the scene to begin scrubbing as soon as the target element has intersected the viewport, as opposed to when the target element has reached the top of the viewport.

An 'offset' value can be supplied to alter the scroll position necessary to begin the scene animation.
```javascript
const scene = new Director.Scene()
scene.fromTo(elements, { scale: [1, 0], opacity: [1, 0] }, { duration: 1, ease: 'easeOutQuint', stagger: 0.1 }, 0)
scene.fromTo(element, { scale: [0, 1], opacity: [0, 1] }, { duration: 1, ease: 'easeOutQuint' }, 0.25)

const camera = new Director.Camera(elementWrapper, scene, { pinned: true, offset: 100, beginOnIntersection: true })
const update = () => {
	scene.setProgress(camera.progress)
	window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)
```

##License
Licensed under [the MIT license](LICENSE.md).


