init:function(g,h){var f=this;f.elem=h;f.$elem=d(h);d("body").removeClass("no-js");f.sliderId="#"+(f.$elem).attr("id");f.$sliderId=d(f.sliderId);f.options=d.extend({},d.fn.liquidSlider.options,g);f.pSign=(f.options.responsive)?"%":"px";if(((navigator.appVersion.indexOf("MSIE 7.")!==-1)||navigator.appVersion.indexOf("MSIE 8.")!==-1)){f.dontAnimateHeight=true}if(f.options.responsive){f.determineAnimationType()}f.build();if(f.options.preloader){f.addPreloader()}if(f.options.autoSlide){f.autoSlide()}f.events();if(f.options.preloader&!f.useCSS){f.removePreloader()}if(f.useCSS){f.clickable=false}d(c).bind("load",function(){if(f.options.preloader){d(".liquid-slider-preloader").each(function(){d(this).fadeOut(f.options.preloaderFadeOutDuration)})}f.loaded=true;f.clickable=true;f.adjustHeightNoAnimation();if(f.options.responsive){f.responsiveEvents(f.loaded)}if(f.options.responsive){f.configureCSSTransitions()}f.readyToSlide=true;f.adjustHeightNoAnimation();f.transition()})},build:function(){var f=this,g;if(f.options.hashCrossLinks){f.getHashTags(c.location.hash)}f.currentTab=(f.hashValue)?f.hashValue-1:f.options.firstPanelToLoad-1;f.tabTemp=f.currentTab;if((f.$sliderId).parent().attr("class")!=="liquid-slider-wrapper"){(f.$sliderId).wrap('<div id="'+(f.$elem).attr("id")+'-wrapper" class="liquid-slider-wrapper"></div>')}f.$sliderWrap=d(f.sliderId+"-wrapper");d(f.sliderId).children().addClass((f.$elem).attr("id")+"-panel panel");f.panelClass=f.sliderId+" ."+(f.$elem).attr("id")+"-panel";f.$panelClass=d(f.panelClass);(f.$panelClass).wrapAll('<div class="panel-container"></div>');(f.$panelClass).wrapInner('<div class="panel-wrapper"></div>');f.panelContainer=(f.$panelClass).parent();f.$panelContainer=f.panelContainer;if(f.options.slideEaseFunction==="fade"){(f.$panelClass).addClass("fadeClass");f.options.continuous=false;d((f.$panelContainer).children()[f.currentTab]).css("display","block")}if(f.options.autoHeight&&!f.options.responsive){f.adjustHeightNoAnimation(d(d(f.panelContainer).children()[f.currentTab]).height()+~~(d(f.sliderId+"-wrapper .liquid-nav-right").height())+f.pSign)}else{if(!f.options.preloader){f.adjustHeightNoAnimation(d(d(f.panelContainer).children()[f.currentTab]).height())}}if(f.options.dynamicTabs){f.addNavigation()}if(f.options.dynamicArrows){f.addArrows()}if(f.options.crossLinks){f.$crosslinks=d("[data-liquidslider-ref*="+(f.sliderId).split("#")[1]+"]")}g=((f.$leftArrow)&&(f.$leftArrow).css("position")==="absolute")?0:1;f.totalSliderWidth=(f.$sliderId).outerWidth(true)+~~(d(f.$leftArrow).outerWidth(true))*g+~~(d(f.$rightArrow).outerWidth(true))*g;d((f.$sliderWrap)).css("width",f.totalSliderWidth);if(f.options.dynamicTabs){f.alignNavigation()}if(f.options.continuous){(f.$panelContainer).prepend((f.$panelContainer).children().last().clone());(f.$panelContainer).append((f.$panelContainer).children().eq(1).clone())}f.clickable=true;f.panelCount=(f.options.slideEaseFunction==="fade")?1:d(f.panelClass).length;f.panelWidth=d(f.panelClass).outerWidth();f.totalWidth=f.panelCount*f.panelWidth;if(f.options.responsive&&!f.useCSS){f.slideWidth=100}else{f.slideWidth=(f.$sliderId).width()}if(f.options.slideEaseFunction!=="fade"&&!f.useCSS){d(f.panelContainer).css("margin-left",(-f.slideWidth*~~(f.options.continuous))+(-f.slideWidth*f.currentTab)+f.pSign)}f.setCurrent(f.currentTab);d(f.sliderId+" .panel-container").css("width",f.totalWidth);if(f.options.responsive){f.makeResponsive()}if(f.useCSS){f.panelWidth=d(f.panelClass).outerWidth();(f.panelContainer).css({"margin-left":"0%"});d(f.panelContainer).css({transform:"translate3d("+((-f.panelWidth*~~(f.options.continuous))+(-f.panelWidth*f.currentTab)+"px")+", 0, 0)","-webkit-transform":"translate3d("+((-f.panelWidth*~~(f.options.continuous))+(-f.panelWidth*f.currentTab)+"px")+", 0, 0)","-moz-transform":"translate3d("+((-f.panelWidth*~~(f.options.continuous))+(-f.panelWidth*f.currentTab)+"px")+", 0, 0)"})}},events:function(){var f=this;if(f.options.dynamicArrows){f.registerArrows()}if(f.options.crossLinks){f.registerCrossLinks()}if(f.options.dynamicTabs){(f.$sliderWrap).find("[class^=liquid-nav] li").on("click",function(){if(!f.clickable){return false}if(typeof f.options.callforwardFunction==="function"){f.animationCallForward(true)}f.setCurrent(parseInt(d(this).attr("class").split("tab")[1],10)-1);if(typeof f.options.callbackFunction==="function"){f.animationCallback(true)}return false})}(f.$sliderWrap).find("*").on("click",function(){if(!f.options.autoSlidePauseOnHover||f.options.autoSlideStopWhenClicked){f.checkAutoSlideStop();if(f.options.continuous){clearTimeout(f.continuousTimeout)}}});if(f.options.autoSlidePauseOnHover||(f.options.hoverArrows&&f.options.dynamicArrows)){f.hoverable=true;f.hover()}if(f.options.swipe){f.touch()}if(f.options.keyboardNavigation){f.keyboard()}},setCurrent:function(g){var f=this;if(f.clickable){f.clickable=false;if(typeof g==="number"){f.currentTab=g}else{f.currentTab+=(~~(g==="right")||-1);if(!f.options.continuous){f.currentTab=(f.currentTab<0)?d(f.panelClass).length-1:(f.currentTab%d(f.panelClass).length)}}if(f.options.continuous){f.panelHeightCount=f.currentTab+1;if(f.currentTab===f.panelCount-2){f.setTab=0}else{if(f.currentTab===-1){f.setTab=f.panelCount-3}else{f.setTab=f.currentTab}}}else{f.panelHeightCount=f.currentTab;f.setTab=f.currentTab}if(f.options.dynamicTabs){d((f.$sliderWrap)).find(".tab"+(f.setTab+1)+":first a").addClass("current").parent().siblings().children().removeClass("current")}if(f.options.crossLinks){(f.$crosslinks).each(function(){if(f.options.hashCrossLinks){if(d(this).attr("href")===("#"+d(d(f.panelContainer).children()[(f.setTab+~~(f.options.continuous))]).find(f.options.panelTitleSelector).text().replace(/(\s)/g,"-").toLowerCase())){d("[data-liquidslider-ref="+(f.sliderId).split("#")[1]+"]").removeClass("currentCrossLink");d(this).addClass("currentCrossLink")}}else{if(d(this).attr("href")==="#"+(f.setTab+1)){d("[data-liquidslider-ref="+(f.sliderId).split("#")[1]+"]").removeClass("currentCrossLink");d(this).addClass("currentCrossLink")}}})}if(f.options.responsive&&f.options.mobileNavigation&&f.loaded){d(f.sliderId+"-nav-select").val("tab"+(f.setTab+1))}if(f.options.hashCrossLinks){f.updateHashTags(f.currentTab)}if(f.options.hideSideArrows){f.hideArrows()}if(!f.options.hoverArrows){(f.$leftArrow).css({opacity:0,visibility:"visible"}).animate({opacity:1},f.options.hideSideArrowsDuration*3);(f.$rightArrow).css({opacity:0,visibility:"visible"}).animate({opacity:1},f.options.hideSideArrowsDuration*3)}this.transition()}},getHeight:function(f){var g=this,h;h=f||d(d(g.panelContainer).children()[g.panelHeightCount]).css("height").split("px")[0];g.setHeight=(g.options.autoHeightRatio)?(((g.$sliderWrap).outerWidth(true)/(g.options.autoHeightRatio).split(":")[1]*(g.options.autoHeightRatio).split(":")[0])):h;g.setHeight=(g.setHeight<h)?g.setHeight:h;g.setHeight=(g.setHeight<g.options.autoHeightMin)?g.options.autoHeightMin:g.setHeight;if(!g.removePre&&g.options.preloader){g.removePre=true;return g.removePreloader()}return g.setHeight},getHeighestPanel:function(){var g=this,f=0,h;d(g.sliderId+" .panel").each(function(){h=d(this).height();f=(h>f)?h:f});return f},adjustHeight:function(i,h,f){var g=this;if(g.options.autoHeight&&(g.useCSS||g.dontAnimateHeight)){g.adjustHeightNoAnimation(f)}else{if(g.options.autoHeight){(g.$sliderId).animate({height:g.getHeight(f)+"px"},{easing:i||g.options.autoHeightEaseFunction,duration:h||g.options.autoHeightEaseDuration,queue:false})}}},adjustHeightNoAnimation:function(f){var g=this;(g.$sliderId).css({height:g.getHeight(f)+"px"})},transition:function(){var f=this;if(f.options.autoHeight){f.adjustHeight()}if(f.options.slideEaseFunction==="fade"){if(f.loaded){d(d(f.panelContainer).children()[f.currentTab]).fadeTo(f.options.fadeInDuration,1).siblings().fadeTo(f.options.fadeOutDuration,0);setTimeout(function(){if(f.options.continuous){f.continuousSlide()}else{f.clickable=true}},f.options.slideEaseDuration+50)}}else{if(f.loaded||!f.useCSS){if(f.options.continuous){f.marginLeft=-(f.currentTab*f.slideWidth)-f.slideWidth}else{f.marginLeft=-(f.currentTab*f.slideWidth)}if((f.marginLeft+f.pSign)!==(f.panelContainer).css("margin-left")||(f.marginLeft!==-100)){if(f.useCSS&&f.loaded){(f.panelContainer).css({"-webkit-transform":"translate3d("+f.marginLeft+f.pSign+", 0, 0)","-moz-transform":"translate3d("+f.marginLeft+f.pSign+", 0, 0)","-ms-transform":"translate3d("+f.marginLeft+f.pSign+", 0, 0)","-o-transform":"translate3d("+f.marginLeft+f.pSign+", 0, 0)",transform:"translate3d("+f.marginLeft+f.pSign+", 0, 0)"});setTimeout(function(){if(f.options.continuous){f.continuousSlide()}else{f.clickable=true}},f.options.slideEaseDuration+50)}else{(f.panelContainer).animate({"margin-left":f.marginLeft+f.pSign},{easing:f.options.slideEaseFunction,duration:f.options.slideEaseDuration,queue:false,complete:function(){if(f.options.continuous){f.continuousSlide()}else{f.clickable=true}}})}}}}if(f.options.responsive){d(f.sliderId+"-wrapper").css("width",(f.$sliderId).outerWidth(true))}}};d.fn.liquidSlider=function(f){return this.each(function(){var g=Object.create(b);g.init(f,this);d.data(this,"liquidSlider",g)})};d.fn.liquidSlider.options={autoHeight:true,autoHeightMin:0,autoHeightEaseDuration:1500,autoHeightEaseFunction:"easeInOutExpo",autoHeightRatio:null,slideEaseDuration:1500,fadeInDuration:1000,fadeOutDuration:1000,slideEaseFunction:"easeInOutExpo",callforwardFunction:null,callbackFunction:null,autoSlide:false,autoSliderDirection:"right",autoSlideInterval:7000,autoSlideControls:false,autoSlideStartText:"Start",autoSlideStopText:"Stop",autoSlideStopWhenClicked:false,autoSlidePauseOnHover:false,continuous:false,dynamicArrows:false,dynamicArrowsGraphical:false,dynamicArrowLeftText:"&#171; left",dynamicArrowRightText:"right &#187;",hideSideArrows:false,hideSideArrowsDuration:750,hoverArrows:false,hoverArrowDuration:250,dynamicTabs:false,dynamicTabsAlign:"left",dynamicTabsPosition:"top",firstPanelToLoad:1,panelTitleSelector:"h2.title",navElementTag:"div",crossLinks:false,hashLinking:false,hashNames:true,hashCrossLinks:false,hashTitleSelector:"h2.title",hashTagSeparator:"",hashTLD:"",keyboardNavigation:false,leftKey:39,rightKey:37,panelKeys:{1:49,2:50,3:51,4:52},responsive:false,mobileNavigation:false,mobileNavDefaultText:"Menu",mobileUIThreshold:0,hideArrowsWhenMobile:false,hideArrowsThreshold:481,useCSSMaxWidth:1030,preloader:false,preloaderFadeOutDuration:250,preloaderElements:"img,video,iframe,object",swipe:false}})(jQuery,window,document);