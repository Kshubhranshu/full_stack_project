CREATE DATABASE  IF NOT EXISTS `iiyproject` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `iiyproject`;
-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: iiyproject
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aboutus`
--

DROP TABLE IF EXISTS `aboutus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aboutus` (
  `content_title` varchar(10) DEFAULT NULL,
  `image_location` varchar(100) DEFAULT NULL,
  `description` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aboutus`
--

LOCK TABLES `aboutus` WRITE;
/*!40000 ALTER TABLE `aboutus` DISABLE KEYS */;
INSERT INTO `aboutus` VALUES ('about','/img/360illustration.svg','Website.com began in 2005. After years in the web hosting industry, we realized that it was near impossible for the average Jane or Joe to create their own website. Traditional web hosting services were simply too complicated, time consuming, and expensive to manage.  We created the Website.com Site Builder with the user\'s perspective in mind. We wanted to offer a platform that would require no coding skills or design experience. We keep it simple, so users can focus on creating an amazing website that reflects their brand. Best of all - it\'s free. You can get online, showcase your brand, or start selling products right away.  After seeing an increased need for ecommerce solutions, we developed one of the only fully-featured, free and commission-free online store builders, allowing business owners to launch their online business.  Today, we\'re proud to empower individuals and small business owners around the world. Everyone deserves a website, and we\'re excited to see what you create.');
/*!40000 ALTER TABLE `aboutus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz` (
  `question` mediumtext,
  `option1` tinytext,
  `option2` tinytext,
  `option3` tinytext,
  `option4` tinytext,
  `correct_option` tinytext,
  `explanation` mediumtext,
  `class` varchar(10) DEFAULT NULL,
  `topic` tinytext,
  `subject` varchar(20) DEFAULT NULL,
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES ('what is the color of light?','white','black','green','transparent','undefined','we cannot see light','10','light','physics',1),('what is the speed of light?','1 m/s','2 m/s','3 m/s','3X10^8 m/s','3X10^8 m/s','blah blah blah','10','light','physics',2);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_subject`
--

DROP TABLE IF EXISTS `quiz_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_subject`
--

LOCK TABLES `quiz_subject` WRITE;
/*!40000 ALTER TABLE `quiz_subject` DISABLE KEYS */;
INSERT INTO `quiz_subject` VALUES (1,'English'),(3,'Hindi'),(4,'Maths'),(5,'Physics');
/*!40000 ALTER TABLE `quiz_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_topic`
--

DROP TABLE IF EXISTS `quiz_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_topic`
--

LOCK TABLES `quiz_topic` WRITE;
/*!40000 ALTER TABLE `quiz_topic` DISABLE KEYS */;
INSERT INTO `quiz_topic` VALUES (2,'Light');
/*!40000 ALTER TABLE `quiz_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `mobile` varchar(15) NOT NULL,
  `name` varchar(20) NOT NULL,
  `class` varchar(10) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('7568922295','iiy softwaare','Class III','asdfghjkl'),('7739250588','Gourav','Class IV','asdfghjkl'),('8696321398','Gourav','Class IV','asdfghjkl');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `class` varchar(10) DEFAULT NULL,
  `subject` varchar(20) DEFAULT NULL,
  `video_title` varchar(200) DEFAULT NULL,
  `video` varchar(200) DEFAULT NULL,
  `video_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES ('10','science','reflection','/video/Pexels Videos 1494277.mp4',1),('10','random','education','/video/2.mp4',2),('10','random','education','/video/3.mp4',3),('10','random','education','/video/4.mp4',4),('10','random','education','/video/5.mp4',5),('10','random','education','/video/6.mp4',6);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-04 21:19:22
