(function()
{
	giftemplate=document.querySelector("#giftemplate");
	displayArea=document.querySelector("#displayArea");
	btnSearch=document.querySelector("#btnSearch");
	btnLoadMore=document.querySelector("#btnLoadMore");
	btnTrending=document.querySelector('#btnTrending');
	endMessage=document.querySelector('#endMessage');
	loadFrom=0;
	function getTrendingGifs()
	{
		displayArea.innerHTML="";
		loadFrom=0;
		$.ajax({
	    url:"http://api.giphy.com/v1/gifs/trending?api_key=vaRYtfwNTEspnUR3QRsaCjRkr3Wy6Lmx&limit=100",
  		type:"GET",
    	dataType: 'json',                                                                                                                                                                                                
    	success: function(response)
    		 { 
    		 	window.localStorage.setItem("response", JSON.stringify(response.data));
    		 	SetupResults();
    		 	document.querySelector('.LoadingScreen').style.display="none";
    		 	document.querySelector('.mainPage').style.display="block";
    		},                                                                                                                                                                                       
    	error: function() { console.log('Uh Oh!'); },
   		 jsonp: 'jsonp'   
		});
	}

	function getSearchResultsFromGiphy()
	{		
		var searchKeyword=document.querySelector("#searchKeyword").value;
		if(searchKeyword==="")
		{
			alert("Dude!Enter something!");
		}
		else
		{
		displayArea.innerHTML="";
		loadFrom=0;
		$.ajax({
	    url:"http://api.giphy.com/v1/gifs/search?q="+searchKeyword+"&api_key=vaRYtfwNTEspnUR3QRsaCjRkr3Wy6Lmx&limit=100",
    	type:"GET",
    	dataType: 'json',                                                                                                                                                                                                
    	success: function(response)
    		 { 
    		 	window.localStorage.setItem("response", JSON.stringify(response.data));
    		 	SetupResults();
    		 	endMessage.style.display="none";
 				btnLoadMore.style.display="block";
    	},                                                                                                                                                                                       
    	error: function() { console.log('Uh Oh!'); },
   		jsonp: 'jsonp'   
		});

		}
	
 }

 function SetupResults()
 { 	
 	var GifItems = window.localStorage.getItem("response");
		if(GifItems){
			GifItems = JSON.parse(GifItems);
		}
 	
 	for (var i = loadFrom; i <(loadFrom+25); i++) {
 		var imageUrl=GifItems[i].images.fixed_height_small.url;
 		
 		var generatedDiv = DisplayGifs(imageUrl);
		displayArea.appendChild(generatedDiv);
 	}
 	loadFrom=loadFrom+25;
 	if(loadFrom===100)
 	{
 		loadFrom=0;
 		endMessage.style.display="block";
 		btnLoadMore.style.display="none";
 	}
 }

 	
 function DisplayGifs(imageUrl)
 {
 	var source = giftemplate.innerHTML;
	source = source.replaceAll("{{imagesrc}}", imageUrl);
	var div = document.createElement('div');
	div.innerHTML = source;
	return div;
 }


	function init()
	{
		btnSearch.addEventListener('click',getSearchResultsFromGiphy);
		btnLoadMore.addEventListener('click',SetupResults);
		btnTrending.addEventListener('click',getTrendingGifs)
		getTrendingGifs();
	}

	init();

}) ();