TiTutorialView
===========================================

CommonJS Module to use within Appcelerator Titanium.
The Module provides an animation similar to the Path app tutorial.

See it in [in action](https://vimeo.com/78372893). 

### Usage

Use TiSideMenu as a replacement for your root window.

	var win = Ti.UI.createWindow({
	});
	
	var tutorial = new TutorialView({
		images: [
			'/images/bg_1.jpg',
			'/images/bg_2.jpg',
			'/images/bg_3.jpg',
			'/images/bg_4.jpg',
			'/images/bg_5.jpg'
		],
		labels: [
			'Text 1',
			'Text 2',
			'Text 3',
			'Text 4',
			'Text 5',
		]
	});
	win.add( tutorial.view );
	win.open();


### Options


#### images

`Required`  
Type: `Array`  

All the images to show in the tutorial view.

#### labels

`Required`  
Type: `Array` 

Labels to be placed underneath the tutorial view

#### scrollerDef

Type: `Object`  
Default: 
	
		{
            showPagingControl: false,
            top: 0,
            width: '100%',
            height: '100%'
        }

Definition of the Scrollview used inside the module.

#### labelDef

Type: `Object`  
Default:

		{
	    	bottom: 50,
   			textAlign: 'center',
   			layout: 'horizontal'
		}

Definition of the Label describing the visible image.


ABOUT THE AUTHOR
========================
I'm a web enthusiast located in Germany.

Follow me on twitter: @marcelpociot