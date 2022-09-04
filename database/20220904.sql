-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: mydb_app
-- ------------------------------------------------------
-- Server version	5.7.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `index`
--

DROP TABLE IF EXISTS `index`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `index` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `indexing` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `lasindex` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index`
--

LOCK TABLES `index` WRITE;
/*!40000 ALTER TABLE `index` DISABLE KEYS */;
INSERT INTO `index` VALUES (1,'USER','User','22'),(2,'PROD','PRODUCT','1'),(3,'COM','Comment','1');
/*!40000 ALTER TABLE `index` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userindex` varchar(100) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isactivate` tinyint(1) DEFAULT '0',
  `token` varchar(50) DEFAULT NULL,
  `userverificationcode` varchar(100) DEFAULT NULL,
  `userupdatedby` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_email` (`email`),
  UNIQUE KEY `username_unique` (`username`),
  KEY `username_index` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'USER2208000004','suryo','suryo tomo','suryo@mail.com','*ED883D5978CD18B2EA6E6570529C5FC5540C25C7',1,'*44F3A77EFDFB6B53404AF2A937361334697C11B7','','SYSTEM','2022-08-30 14:31:17','2022-08-31 19:50:05'),(32,'USER22080000021','soerjo','soerjo hasto','ryohastomo@gmail.com','*B704C6FA295D7ED9B55DD0A2406850756F5FC673',1,'*EB4E14DDC07C41B0DF6E736C2C7BF992FC56637E','','SYSTEM','2022-08-31 19:26:08','2022-09-02 04:34:28'),(34,'USER22080000022','bol','bol bau','bolbau@testmail.com','*8636B58A45A179F168E74077A405ABE21C2AFC2E',1,'*8951732BA4183C5691C97C0ED53BD87018240853','','SYSTEM','2022-08-31 23:38:54','2022-09-02 23:47:36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mydb_app'
--

--
-- Dumping routines for database 'mydb_app'
--
/*!50003 DROP FUNCTION IF EXISTS `fncgenerateindex` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`dewatic`@`%` FUNCTION `fncgenerateindex`(paramindex VARCHAR(10)) RETURNS varchar(50) CHARSET latin1
BEGIN
	SET @returnTemp = '0800000';
	BLOCKTRANSACTION:BEGIN
		BLOCKTRANSACTIONLASTINDEX:BEGIN
			SET @indextempint = -1;
			SELECT lasindex INTO @indextempint FROM mydb_app.`index` WHERE indexing = paramindex;
		
			IF @indextempint = -1 THEN 
				SET @returnTemp = '0900000';
				LEAVE BLOCKTRANSACTION;
			END IF;
		END BLOCKTRANSACTIONLASTINDEX;
	
		BLOCKTRANSACTIONUPDATELASTINDEX:BEGIN
			IF @indextempint = 999999 THEN
				SET @indextempint = 1;
			ELSE
				SET @indextempint = @indextempint + 1;
			END IF;
		
			SET SQL_SAFE_UPDATES = 0;
			
			UPDATE mydb_app.`index` SET lasindex = @indextempint WHERE indexing = paramindex;
			
			IF row_count() != 1 THEN
				SET @returnTemp = '0999998';
				LEAVE BlockTRANSACTION;
			END IF;
		
			SET SQL_SAFE_UPDATES = 1;
		END BLOCKTRANSACTIONUPDATELASTINDEX;
		
		BlockTRANSACTIONFORMAT:BEGIN
			SELECT CONCAT(paramindex,RIGHT(CONCAT(YEAR(CURDATE()),RIGHT(CONCAT('0', MONTH(CURDATE()),RIGHT(CONCAT('000000',CONVERT(@indextempint,char)), 7)), 9)), 11))
			INTO @returnTemp;
		END BlockTRANSACTIONFORMAT;
	
	END BLOCKTRANSACTION;
	
	RETURN @returnTemp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `spactivateuser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`dewatic`@`%` PROCEDURE `spactivateuser`(IN verificationcode VARCHAR(50))
BEGIN
	DECLARE exit handler for sqlexception
    BEGIN		
		ROLLBACK;
        SET @resultstatus = false;
        SET @resultcode = '099999';
        
        SET @resulterrormessage = '';
        GET DIAGNOSTICS CONDITION 1
				@resulterrormessage = MESSAGE_TEXT;
				
        SET @resultid = 0;
        SET @resultindex = '';
        
        SELECT
			@resultstatus AS resultstatus,
            @resultcode AS resultcode,
            @resulterrormessage AS resulterrormessage,
            @resultid AS resultid,
            @resultindex AS resultindex;
    END;
    
    START TRANSACTION;    
    BLOCKTRANSACTION:BEGIN
		
					SET @resultstatus = true;
					SET @resultcode = '0800000';
					SET @resulterrormessage = '';
					SET @resultid = 0;
					SET @resultindex = '';
				
				
					SELECT count(*), userindex INTO @rowcount, @userindex
					FROM mydb_app.users
					WHERE userverificationcode = verificationcode
					GROUP BY userindex, email;
				
					SET @resultindex = @userindex;

				IF @rowcount <> 1 THEN
					SET @resultstatus = false;
					SET @resultcode = '155555';
					SET @resulterrormessage = 'username not valid';
					LEAVE BLOCKTRANSACTION;
				ELSE
					
					UPDATE users
					SET updatedat = NOW(),
					userupdatedby = "SYSTEM",
					isactivate = true,
					userverificationcode = ""
					WHERE userindex = @resultindex;
														
				END IF;

    END BlockTRANSACTION;
	COMMIT;
    
    SELECT
		@resultstatus AS resultstatus,
		@resultcode AS resultcode,
		@resulterrormessage AS resulterrormessage,
		@resultid AS resultid,
		@resultindex AS resultindex;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `spforgotpassword` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`dewatic`@`%` PROCEDURE `spforgotpassword`(IN inputusername VARCHAR(50))
BEGIN
	DECLARE exit handler for sqlexception
    BEGIN		
		ROLLBACK;
        SET @resultstatus = false;
        SET @resultcode = '099999';
        
        SET @resulterrormessage = '';
        GET DIAGNOSTICS CONDITION 1
				@resulterrormessage = MESSAGE_TEXT;
				
        SET @resultid = 0;
        SET @resultindex = '';
        
        SELECT
			@resultstatus AS resultstatus,
            @resultcode AS resultcode,
            @resulterrormessage AS resulterrormessage,
            @resultid AS resultid,
            @resultindex AS resultindex;
    END;
    
    START TRANSACTION;    
    BLOCKTRANSACTION:BEGIN
		
					SET @resultstatus = true;
					SET @resultcode = '0800000';
					SET @resulterrormessage = '';
					SET @resultid = 0;
					SET @resultindex = '';
				
				SELECT count(*) INTO @usercount
				FROM mydb_app.users 
				WHERE username = inputusername;

				IF @usercount > 0 THEN
				SELECT userindex, username, password 
				INTO @userindex, @username, @password 
				FROM mydb_app.users 
				WHERE username = inputusername;

					UPDATE mydb_app.users
					SET updatedat = NOW(),
					password = "",
					userupdatedby = "SYSTEM",
					isactivate = 0,
					userverificationcode = SHA1(CONCAT(inputusername,NOW()))
					WHERE username = inputusername;
				
					SET @resultindex = @userindex;
				ELSE
					SET @resultstatus = false;
					SET @resultcode = '155555';
					SET @resulterrormessage = 'username not valid';
					LEAVE BLOCKTRANSACTION;										
				END IF;

    END BlockTRANSACTION;
	COMMIT;
    
    SELECT
		@resultstatus AS resultstatus,
		@resultcode AS resultcode,
		@resulterrormessage AS resulterrormessage,
		@resultid AS resultid,
		@resultindex AS resultindex;
	
	SELECT userverificationcode as verificationcode, email as useremail FROM users where userindex = @resultindex;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `splogout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`dewatic`@`%` PROCEDURE `splogout`(IN inputtoken VARCHAR(50))
BEGIN
	DECLARE exit handler for sqlexception
    BEGIN		
		ROLLBACK;
        SET @resultstatus = false;
        SET @resultcode = '099999';
        
        SET @resulterrormessage = '';
        GET DIAGNOSTICS CONDITION 1
				@resulterrormessage = MESSAGE_TEXT;
				
        SET @resultid = 0;
        SET @resultindex = '';
        
        SELECT
			@resultstatus AS resultstatus,
            @resultcode AS resultcode,
            @resulterrormessage AS resulterrormessage,
            @resultid AS resultid,
            @resultindex AS resultindex;
    END;
    
    START TRANSACTION;    
    BLOCKTRANSACTION:BEGIN

				SET @resultstatus = true;
				SET @resultcode = '0800000';
				SET @resulterrormessage = '';
				SET @resultid = 0;
				SET @resultindex = '';
				
				SELECT count(*) INTO @usercount
				FROM mydb_app.users 
				WHERE token = inputtoken;

				IF @usercount > 0 THEN
					SELECT userindex INTO @accountindex
					FROM mydb_app.users 
					WHERE token = inputtoken;

					UPDATE mydb_app.users 
					SET token = "",updatedat = NOW()						
					WHERE userindex  = @accountindex;

					SET @resultindex = @accountindex;
				ELSE 					
					SET @resultstatus = false;
					SET @resultcode = '155555';
					SET @resulterrormessage = 'has logout';
					LEAVE BLOCKTRANSACTION;
				END IF;

    END BLOCKTRANSACTION;
	COMMIT;
    
    SELECT
		@resultstatus AS resultstatus,
		@resultcode AS resultcode,
		@resulterrormessage AS resulterrormessage,
		@resultid AS resultid,
		@resultindex AS resultindex;		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `spresetpassword` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`dewatic`@`%` PROCEDURE `spresetpassword`(
IN verificationcode VARCHAR(50), 
IN newpassword VARCHAR(50))
BEGIN
		DECLARE exit handler for sqlexception
    BEGIN		
		ROLLBACK;
        SET @resultstatus = false;
        SET @resultcode = '099999';
        
        SET @resulterrormessage = '';
        GET DIAGNOSTICS CONDITION 1
				@resulterrormessage = MESSAGE_TEXT;
				
        SET @resultid = 0;
        SET @resultindex = '';
        
        SELECT
			@resultstatus AS resultstatus,
            @resultcode AS resultcode,
            @resulterrormessage AS resulterrormessage,
            @resultid AS resultid,
            @resultindex AS resultindex;
    END;
    
    START TRANSACTION;    
    BLOCKTRANSACTION:BEGIN
		
					SET @resultstatus = true;
					SET @resultcode = '0800000';
					SET @resulterrormessage = '';
					SET @resultid = 0;
					SET @resultindex = '';
				
				
					SELECT count(*), userindex, email INTO @rowcount, @userindex, @useremail 
					FROM mydb_app.users
					WHERE userverificationcode = verificationcode
					GROUP BY userindex, email;
				
					SET @resultindex = @userindex;


				IF @rowcount <> 1 THEN
					SET @resultstatus = false;
					SET @resultcode = '155555';
					SET @resulterrormessage = 'username not valid';
					LEAVE BLOCKTRANSACTION;
				ELSE
					
					UPDATE users
					SET updatedat = NOW(),
					password = PASSWORD(newpassword),
					userupdatedby = "SYSTEM",
					isactivate = 1,
					userverificationcode = ""
					WHERE userindex = @resultindex;
														
				END IF;

    END BlockTRANSACTION;
	COMMIT;
    
    SELECT
		@resultstatus AS resultstatus,
		@resultcode AS resultcode,
		@resulterrormessage AS resulterrormessage,
		@resultid AS resultid,
		@resultindex AS resultindex;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `spsignin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`dewatic`@`%` PROCEDURE `spsignin`(
IN inputusername VARCHAR(50),
IN pass VARCHAR(50))
BEGIN
	DECLARE exit handler for sqlexception
    BEGIN		
		ROLLBACK;
        SET @resultstatus = false;
        SET @resultcode = '099999';
        
        SET @resulterrormessage = '';
        GET DIAGNOSTICS CONDITION 1
				@resulterrormessage = MESSAGE_TEXT;
				
        SET @resultid = 0;
        SET @resultindex = '';
        
        SELECT
			@resultstatus AS resultstatus,
            @resultcode AS resultcode,
            @resulterrormessage AS resulterrormessage,
            @resultid AS resultid,
            @resultindex AS resultindex;
    END;
    
    START TRANSACTION;    
    BLOCKTRANSACTION:BEGIN

				SET @resultstatus = true;
				SET @resultcode = '0800000';
				SET @resulterrormessage = '';
				SET @resultid = 0;
				SET @resultindex = '';
				
				SELECT count(*) INTO @usercount
				FROM mydb_app.users 
				WHERE username = inputusername AND isactivate = 1;

				IF @usercount > 0 THEN
					SELECT userindex, username, email, password 
					INTO @accountindex, @username, @emailcount, @password 
					FROM mydb_app.users 
					WHERE username = inputusername;

					IF PASSWORD(pass) = @password THEN
						UPDATE mydb_app.users 
						SET updatedat = NOW(),token = PASSWORD(CONCAT(@username, NOW()))
						WHERE userindex  = @accountindex;

						SET @resultindex = @accountindex;
					ELSE
						SET @resultstatus = false;
						SET @resultcode = '155555';
						SET @resulterrormessage = 'wrong password';
						LEAVE BLOCKTRANSACTION;
					END IF;
				ELSE 					
					SET @resultstatus = false;
					SET @resultcode = '155555';
					SET @resulterrormessage = 'username not found';
					LEAVE BLOCKTRANSACTION;
				END IF;

    END BLOCKTRANSACTION;
	COMMIT;
    
    SELECT
		@resultstatus AS resultstatus,
		@resultcode AS resultcode,
		@resulterrormessage AS resulterrormessage,
		@resultid AS resultid,
		@resultindex AS resultindex;
	
	SELECT userindex, username, token
	FROM users
	WHERE userindex  = @resultindex;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `spsignup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`dewatic`@`%` PROCEDURE `spsignup`(
	IN inputusername VARCHAR(50),
	IN userfullname VARCHAR(100),
	IN useremail VARCHAR(50),
	IN userpassword VARCHAR(100)
)
BEGIN
	DECLARE exit handler for sqlexception
		BEGIN
			ROLLBACK;
			SET @resultstatus = false;
			SET @resultcode = '099999';
		
			SET @resulterrormessage = '';
			GET DIAGNOSTICS CONDITION 1
				@resulterrormessage = MESSAGE_TEXT;
			
			SET @resultid = 0;
			SET @resultindex = '';
		
			SELECT
				@resultstatus AS resultstatus,
				@resultcode AS resultcode,
				@resulterrormessage AS resulterrormessage,
				@resultid AS resultid,
				@resultindex AS resultindex;
		END;
		
	START TRANSACTION;
	BLOCKTRANSACTION:BEGIN
		
		SET @resultstatus = true;
        SET @resultcode = '0800000';        
        SET @resulterrormessage = '';				
        SET @resultid = 0;
        SET @resultindex = '';
       
       	SELECT count(*) INTO @emailcount FROM mydb_app.users WHERE email = useremail;
       	IF @emailcount >=1 THEN
      		SET @resultstatus = false;
			SET @resultcode = '155555';
			SET @resulterrormessage = 'Email Exists';
			LEAVE BLOCKTRANSACTION;
		END IF;
	
       	SELECT count(*) INTO @emailcount FROM mydb_app.users WHERE username = inputusername;
       	IF @emailcount >=1 THEN
      		SET @resultstatus = false;
			SET @resultcode = '155555';
			SET @resulterrormessage = 'Username Exists';
			LEAVE BLOCKTRANSACTION;
		END IF;

	
		SELECT fncgenerateindex('USER')
		INTO @generatorindex;
		
		INSERT INTO mydb_app.users 
		(
			userindex,
			username,
			fullname,
			email,
			password,
			isactivate,
			userverificationcode
		)
		VALUES (
		@generatorindex,
		inputusername,
		userfullname,
		useremail,
		PASSWORD(userpassword),
		FALSE,
		SHA1(CONCAT(inputusername,NOW()))
		);
		
		SET @resultindex = @generatorIndex;
		
					
	END BLOCKTRANSACTION;
	COMMIT;

	SELECT
		@resultstatus AS resultstatus,
		@resultcode AS resultcode,
		@resulterrormessage AS resulterrormessage,
		@resultid AS resultid,
		@resultindex AS resultindex;
	 
	IF @resultstatus = 1 THEN
		SELECT
		userindex AS userindex,
		username AS username,
		fullname AS userfullname,
		email AS useremail,
		userverificationcode AS verificationcode
		FROM mydb_app.users
		WHERE userindex = @resultindex;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-04 13:25:50
