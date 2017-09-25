function freezeAllGifs() 
{   
    var freeze = document.getElementsByTagName('img');
    
    if(freeze.length > 0 ){
        console.log(freeze);
        setInterval(function() 
        {
            for(var i = 0; i < freeze.length; i++)
            {
               freeze[i].src = freeze[i].src;
            }
        },1);
    }
}
freezeAllGifs();