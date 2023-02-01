-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: bingo
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `partidabingo`
--

DROP TABLE IF EXISTS `partidabingo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partidabingo` (
  `id_partida_bingo` int NOT NULL AUTO_INCREMENT,
  `fecha_partida_bingo` datetime(6) DEFAULT NULL,
  `ganador` bit(1) DEFAULT NULL,
  `jugador_ganador` varchar(255) DEFAULT NULL,
  `balotario_id` int DEFAULT NULL,
  `sesion_id` int DEFAULT NULL,
  PRIMARY KEY (`id_partida_bingo`),
  KEY `FK1twjsvgb4txlm28u0nk06uj3w` (`balotario_id`),
  KEY `FKnwmpq9sj37bd0c4ghplfftgv5` (`sesion_id`),
  CONSTRAINT `FK1twjsvgb4txlm28u0nk06uj3w` FOREIGN KEY (`balotario_id`) REFERENCES `balotario` (`id`),
  CONSTRAINT `FKnwmpq9sj37bd0c4ghplfftgv5` FOREIGN KEY (`sesion_id`) REFERENCES `sesion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partidabingo`
--

LOCK TABLES `partidabingo` WRITE;
/*!40000 ALTER TABLE `partidabingo` DISABLE KEYS */;
/*!40000 ALTER TABLE `partidabingo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-31 20:33:48
