function TutorialView( options )
{
	// 'merge' from deepmerge project (https://github.com/nrf110/deepmerge)
    function merge(b,c){var e=Array.isArray(c),d=e?[]:{};e?(b=b||[],d=d.concat(b),c.forEach(function(a,c){"object"===typeof a?d[c]=merge(b[c],a):-1===b.indexOf(a)&&d.push(a)})):(b&&"object"===typeof b&&Object.keys(b).forEach(function(a){d[a]=b[a]}),Object.keys(c).forEach(function(a){d[a]="object"===typeof c[a]&&c[a]?b[a]?merge(b[a],c[a]):c[a]:c[a]}));return d};
    
    function missing(obj) {
        return (obj === undefined || obj === null);
    }
    
    // Set default options
    options = merge({
        images: [],
        labels: [],
        labelDef: {
    		bottom: 50,
    		textAlign: 'center',
    		layout: 'horizontal'
        },
        scrollerDef: {
            showPagingControl: false,
            top: 0,
            width: '100%',
            height: '100%'
        }
    }, options);
    
    
    // Verify that required arguments exist
    if( missing(options.images) ) {
    	Ti.API.error('[TiTutorial] Missing property `images`.');
        return;
    }
    
    if( options.images.length == 0 )
    {
    	Ti.API.error('[TiTutorial] Property `images` is empty.');
    	return;
    }
    
    if( missing(options.labels) ) {
    	Ti.API.error('[TiTutorial] Missing property `labels`.');
        return;
    }
    
    if( options.labels.length == 0 )
    {
    	Ti.API.error('[TiTutorial] Property `labels` is empty.');
    	return;
    }
    
    var imageViews = [],
    	currentIndex = 0,
    	scrollDirection,
    	container  = Ti.UI.createView({
    		top: 0,
    		left: 0,
    		width: '100%',
    		height: '100%'
    	}),
    	scrollable = Ti.UI.createScrollableView(options.scrollerDef);
    
    // Add image views to container
    for( var i=0,max=options.images.length; i<max; i++ )
    {
    	var imageView = Ti.UI.createImageView({
    		image: options.images[i],
    		width: '100%',
    		height: '100%'
    	});
    	if( i > 0 )
    	{
    		imageView.opacity = 0;
    	}
    	imageViews.push( imageView );
    	container.add( imageView );
    }
    
    // Add labels to scrollview
    var labelViews = [];
    for( var i=0,max=options.labels.length; i<max; i++ )
    {
    	var labelView 	= Ti.UI.createView();
    	var label 		= Ti.UI.createLabel(merge(labelDef, {
    		text: options.labels[i]
    	}));
    	labelView.add( label );
    	labelViews.push( labelView );
    }
    scrollable.views = labelViews;
    
    scrollable.addEventListener('scroll',function(e)
    {
    	if( e.currentPageAsFloat > 0 && (e.currentPageAsFloat % 1 != 0) )
    	{
    		var currentImage 	= imageViews[ currentIndex ],
    			nextImage 		= imageViews[ (currentIndex + 1) ],
				offset 			= e.currentPageAsFloat+'';
				
				// Calculate the opacity value we need to use
	    	  offset 				= parseFloat( '0' + offset.substr( offset.indexOf('.') ) );
			  offset 				= Math.round(offset * 10) / 10;
	    	  var 	currentOffset 	= 1 - offset,
	    	  		nextOffset 		= offset;
	    	  
    		if( e.currentPageAsFloat <= currentIndex )
    		{
    			nextImage		= imageViews[ (currentIndex - 1) ];
    			currentOffset 	= offset;
    			nextOffset 		= 1 - offset;
    		}
    		
			if( typeof( nextImage ) !== 'undefined' )
    	  	{
    	  		if( nextImage.opacity != nextOffset )
    	  		{
    	  			nextImage.opacity 	= nextOffset;
    	  		}
    	  	}
    	  	if( currentImage.opacity != currentOffset )
    		{
	    	  	currentImage.opacity 	= currentOffset;
    		}
    	  	
    	}
    });
    scrollable.addEventListener('scrollend',function(e)
    {
    	currentIndex = e.currentPage;
    	imageViews[ currentIndex ].opacity = 1;
    });
    container.add(scrollable);
    
    this.view = container;
    return this;
}

module.exports = TutorialView;
