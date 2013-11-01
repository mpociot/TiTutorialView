//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var TutorialView = require('ui/common/TutorialView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
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
	self.add( tutorial.view );
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
