"use strict";hilary.register("myController",{init:function(r,n,o){var t=function(){return r({url:"foo/bar/12",method:"GET"}).done(function(r){var t,i;t=n.fromModel(r),i=o(),i.bindTo(t)})};return{action:t}}});