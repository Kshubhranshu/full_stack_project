//global variable for userid ie. mobile number
const port =  process.env.PORT || 2000;
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

//route for index.html
app.get('/', function(req, res) {
    res.render('index.html');
});

//route for user home page
app.get('/home',function(req, res){
    res.render('index');
});

// ............................................................ADMIN SECTION...........................................................
//route for admin page
app.get('/admin',function(req,res){
    res.render('admin')
});



//route for viewing students detials
app.get("/admin/view_students",function( 
    req,res){
    console.log(req.body);
    let sql = 'select * from user'
    let query = connection.query(sql,function(err,result){
    if(err) throw err;
    let student_data =[];

        for (let i = 0; i < result.length; i++) {
            let obj={
                mobile:result[i].mobile,
                name:result[i].name,
                class:result[i].class,
                password:result[i].password,
            };
            student_data.push(obj);
            JSON.stringify(student_data);
        } 
    res.render('view_students',{student_data:student_data})
    });
})


//route for deleting student data 
app.post("/admin/view_students/delete",function (req,res) 
{
    var id = req.body.id;
    let sql = `DELETE FROM user WHERE mobile=${id} `;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_students");
    })
})
           
//route for viewing about us page content
    app.get("/admin/view_aboutus",function( 
        req,res){
        console.log(req.body);
        let sql = 'select * from aboutus'
        let query = connection.query(sql,function(err,result){
        if(err) throw err;
        console.log(result[0].image_location);
        res.render('view_aboutus',{temp:result[0].description,location:result[0].image_location})
        });
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

//route for adding image in about us page
app.post("/admin/view_aboutus/add_image",function (req,res) 
{
    var add_image_location = req.body.add_image_location;
    let sql = `update aboutus set image_location = "${add_image_location}" where content_title="about"`;
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
var readme = fs.readFileSync('notes.txt', 'utf8');
app.get("/admin/view_notes",function( 
    req,res){
    res.render('view_notes',{readme:readme})
    })

//route for view all quiz questions
app.get('/admin/view_quiz',function(req,res){
    let sql = 'select * from quiz; select * from quiz_subject; select * from quiz_topic';
    let query = connection.query(sql,[3,1],function(err,result){
        if(err) throw err;
        let quiz_data =[];
        let quiz_subject = [];
        let quiz_topic = [];
        
        for (var i = 0; i < result[0].length; i++) {
            let obj={
                question_id: result[0][i].question_id,
                subject : result[0][i].subject,
                topic : result[0][i].topic,
                class : result[0][i].class,
                question : result[0][i].question,
                option1 : result[0][i].option1,
                option2 : result[0][i].option2,
                option3 : result[0][i].option3,
                option4 : result[0][i].option4,
                correct_option : result[0][i].correct_option,
                explanation : result[0][i].explanation,
            };

            for (var i = 0; i < result[1].length; i++) {
                quiz_subject.push(result[1][i].subject)
            } 
            for (var i = 0; i < result[2].length; i++) {
                quiz_topic.push(result[2][i].topic)
            } 
        
            quiz_data.push(obj);
            console.log(quiz_data)
            console.log(quiz_subject)
            console.log(quiz_topic)
        } 
        res.render('view_quiz',{quiz_data:quiz_data, quiz_subject:quiz_subject, quiz_topic: quiz_topic})
        // data.forEach(element => {
        //     console.log(element)
        // });
    })
})

//route for adding quiz
app.post("/admin/view_quiz/add",function (req,res) 
{
    var add_class = req.body.class;
    var add_topic = req.body.topic;
    var add_subject = req.body.subject;
    var add_question = req.body.question;
    var add_option1 = req.body.option1;
    var add_option2 = req.body.option2;
    var add_option3 = req.body.option3;
    var add_option4 = req.body.option4;
    var add_correct_option = req.body.correct_option;
    var add_explanation = req.body.explanation;
    let sql = `insert into quiz(question, option1, option2, option3, option4, correct_option, explanation, class, topic, subject) values("${add_question}","${add_option1}","${add_option2}","${add_option3}","${add_option4}","${add_correct_option}","${add_explanation}","${add_class}","${add_topic}","${add_subject}");ALTER TABLE quiz DROP question_id; ALTER TABLE quiz ADD question_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY`;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_quiz");
    })
})

//route for deleting quiz question
app.post("/admin/view_quiz/delete",function (req,res) 
{
    var question_id = req.body.question_id;
    let sql = `DELETE FROM quiz WHERE question_id=${question_id};ALTER TABLE quiz DROP question_id; ALTER TABLE quiz ADD question_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY`;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_quiz");
    })
})

app.post("/admin/view_quiz/add_subject",function (req,res) 
{
    let add_subject = req.body.subject;
    let sql = `insert into quiz_subject(subject) values("${add_subject}")`;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_quiz");
    })
})

app.post("/admin/view_quiz/add_topic",function (req,res) 
{
    let add_topic = req.body.topic;
    let sql = `insert into quiz_topic(topic) values("${add_topic}")`;
    connection.query(sql,function(err,result){
        if(err) throw err;
        res.redirect("/admin/view_quiz");
    })
})



    


//................................................ADMIN SECTION ENDS........................................................................

//................................................USER SECTION..............................................................................
//route for admin login from index.html
app.post("/register",function (req,res) 
{
    let mobile = req.body.mobile;
    let password = req.body.password;
    let select_class = req.body.select_class;
    let name = req.body.name;
    let sql = `insert into user(mobile,name,class,password) values("${mobile}","${name}","${select_class}","${password}")`;
    // if (studentData.includes(mobile)) {
    //     redirect('/');
    // }
    res.redirect("/")
    connection.query(sql,function(err,result){
        if(err) throw err;
    })
//validation of register data before inserting into mysql
   
});

//route for about us page for users
app.get('/about',function(req,res){
    let sql = 'select * from aboutus'
    let query = connection.query(sql,function(err,result){
        if(err) throw err;
        console.log(result[0].description);
        console.log(result[0].image_location);
        let description=result[0].description;
        let location =result[0].image_location;
        location = location.slice(1);
        console.log(location)
        res.render('about',{ temp:description, location:location })
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

//reading and writing into notes file
var readme = fs.readFileSync('notes.txt', 'utf8')
app.get("/notes",function( 
    req,res){
    res.render('notes',{readme:readme})
    })

//video playback section
app.get("/video_listing/video_playback",function(req,res){
    res.render("video_playback")
})

//quiz page
app.get("/quiz",function (req,res){
        let sql = 'select * from quiz_subject;select * from quiz_topic';
        let query = connection.query(sql,[2,1],function(err,results){
            if(err) throw err;
            // console.log(results[1]); //shows all the subjects
            // console.log(results[0]);//shows all the topics

            subject = [];topic = [];
            for (var i = 0; i < results[0].length; i++) {
                subject.push(results[0][i].subject)
            } 
            for (var i = 0; i < results[1].length; i++) {
                topic.push(results[1][i].topic)
            } 
            res.render("quiz",{subject:subject, topic:topic, temp:""})

            })
})

//quiz page on starting the quiz
app.post("/quiz",function(req, res){
    let select_subject = req.body.select_subject;
    let select_topic = req.body.select_topic;
    console.log(select_subject,select_topic)
    let sql = `select question,option1,option2,option3,option4 from quiz where subject="${select_subject}" and topic="${select_topic}"`;
    
    let query = connection.query(sql,function(err,result){
        if(typeof result !== 'undefined' && result.length == 0){
            let temp="No Quiz found related to your selection";
            res.render("quiz",{temp: temp});
        };

        console.log(result)
        

        })
})



//quiz startup page
app.get("/quiz/start",function(req,res){
    res.render("start_quiz_page")
})


    
//................................................USER SECTION ENDS..............................................................................
//route for admin login from index.html
app.post("/login",function (req,res) 
{
    let mobile = req.body.mobile;
    let password = req.body.password;
    // var temp = studentData.filter(function(item) { return item["mobile"] === mobile && item["password"] === password ; });
    console.log(mobile,password)
    if(mobile=="1234567890" && password=="admin"){
        res.redirect("/admin") 
        console.log(mobile,password);}
    else
    {   
        res.redirect("/home")
    }
});


// running server
app.listen(port,()=>{
    console.log("server running at localhost:",port);
});