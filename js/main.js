//Listen for submit >> listen to 'submit' and call function 'saveBookmark'
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Save bookmark
function saveBookmark(e){
    //Get Values From the form
    var name = document.getElementById('name').value;
    var url = document.getElementById('url').value;
    
    //Validate the form
   if(!validaForm(name,url)){
       return false;
   }

    //Make an opject of the whole bookmark
    var bookmark = {
        name: name,
        url: url
    }

    /*Local Storage test
    localStorage.setItem('test','First');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));*/

    //Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null)
    {
        //Init bookmarks
        var bookmarks = [];
        //Add bookmark object to the array
        bookmarks.push(bookmark);
        //Set to LoacalStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else
    {
        //Get bookmarks from localStorage 
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to the array
        bookmarks.push(bookmark);
        //Re-set back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    //Clear the Form
    document.getElementById('myForm').reset();

    //Re-fetch Bookmarks
    fetchBookmarks();
    //Prevent the Form from submitting 
    e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url){
    //Get Bookmarks From localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Searchin for the 
    for(var i=0;i<bookmarks.length;i++)
    {
        if(bookmarks[i].url == url )
        {
            //Remove from the array
            bookmarks.splice(i,1);
        }
    }

    //Re-set back to LocalStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchBookmarks();  
}


//Fetch Bookmarks
function fetchBookmarks(){
    //Get bookmarks from localStorage 
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    //Build outputs
    bookmarksResults.innerHTML = '';
    for(var i=0;i<bookmarks.length;i++)
    {
        var name =bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=' <div class="well">'+
                                    '<h3>' + name +
                                    '<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
                                    '<a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')">Delete</a>'+
                                    '</h3>'+
                                    '</div>';
    }
}

// Validate the form 
function validaForm(name,url){
    if(!name || !url)
    {
        alert("Please make sure that you have written The Name and The URL of the site");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!url.match(regex))
    {
        alert('Please type a correct URL');
        return false;
    }

    return true;
}