// package
const express = require("express");
const mysql = require("mysql");
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:false}))


// creating connection to database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'iiyproject',
    multipleStatements: true
   });
  
  connection.connect(function(err){
      if(err){
          console.log(err);
      }
      console.log("my sql connectedd...");
  });

// static index.html page display
app.use(express.static('public'))
app.use(express.static('videos'))
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/videos', express.static(__dirname + '/public/videos'));

// ............................................................ADMIN SECTION...........................................................
//route for admin dashboard
    app.get('/admin',function(req,res){
                res.render('admin')
            });
            
//route for viewing about us page content
    app.get("/admin/view_aboutus",function( 
        req,res){
        console.log(req.body);
        let sql = 'select * from aboutus'
        let query = connection.query(sql,function(err,result){
        if(err) throw err;
        console.log(result);
        res.render('view_aboutus',{temp:result[0].description})
        })
    })

//route for editing about us page
app.post("/admin/view_aboutus/add",function (req,res) 
{
    var add_aboutus = req.body.add_aboutus;
    let sql = `update aboutus set description = "${add_aboutus}" where content_title="about"`;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_aboutus");
    })



})

//route for viewing videos

app.get('/admin/view_videos',function(req,res){
    let sql = 'select * from videos'
    let query = connection.query(sql,function(err,result){
        if(err) throw err;
        var data =[];

        for (var i = 0; i < result.length; i++) {
            var obj={
                video_id:result[i].video_id,
                class:result[i].class,
                subject:result[i].subject,
                video_title:result[i].result,
                video_location:result[i].video
            };
            data.push(obj);
        } 
        res.render('view_videos',{data:data})
        data.forEach(element => {
            console.log(element)
        });

        })
    })

//route for adding video
app.post("/admin/view_videos/add",function (req,res) 
{
    var add_class = req.body.class;
    var add_subject = req.body.subject;
    var add_title = req.body.title;
    var add_location = req.body.location;
    let sql = `insert into videos(class,subject,video_title,video) values("${add_class}","${add_subject}","${add_title}","${add_location}");ALTER TABLE videos DROP video_id; ALTER TABLE videos ADD video_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY`;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_videos");
    })
})

//route for deleting video
app.post("/admin/view_videos/delete",function (req,res) 
{
    var video_id = req.body.video_id;
    let sql = `DELETE FROM videos WHERE video_id=${video_id};ALTER TABLE videos DROP video_id; ALTER TABLE videos ADD video_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY `;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_videos");
    })
})

//route for viewing notes
var readme = fs.readFileSync('notes.txt', 'utf8')
console.log(readme);
app.get("/admin/view_notes",function( 
    req,res){
    res.render('view_notes',{readme:readme})
    })
    


//................................................ADMIN SECTION ENDS........................................................................

//................................................USER SECTION..............................................................................
//route for about us page for users
app.get('/about',function(req,res){
    let sql = 'select * from aboutus'
    let query = connection.query(sql,function(err,result){
        if(err) throw err;
        console.log(result[0].description);
        description=result[0].description;
        res.render('about',{ temp:description})
    })
})

//videos page for users
app.get('/video_listing',function(req,res){
        let sql = 'select * from videos'
        let query = connection.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            data =[];
            for (var i = 0; i < result.length; i++) {
                data.push(result[i].video)
            } 
            res.render('video_listing',{video:data})
            console.log(data)
            })
        })

//test page for users
app.get('/test',function(req,res){
    res.render('test')
});

    
//................................................USER SECTION ENDS..............................................................................

//reading and writing into notes file
var readme = fs.readFileSync('notes.txt', 'utf8')
console.log(readme);
app.get("/notes",function( 
    req,res){
    res.render('notes',{readme:readme})
    })

// running server
app.listen('2000',()=>{
    console.log("server running");
});