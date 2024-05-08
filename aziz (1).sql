-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2024 at 04:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aziz`
--

-- --------------------------------------------------------

--
-- Table structure for table `ad`
--

CREATE TABLE `ad` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `linkType` enum('PRODUCT','VENDOR') DEFAULT 'PRODUCT',
  `kind` varchar(255) NOT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `vendorId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `role` enum('ADMIN','SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN',
  `managementPackId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstName`, `lastName`, `email`, `phone`, `password`, `active`, `role`, `managementPackId`) VALUES
('358bc8bd-fbe0-11ee-80d8-5405dbedfa15', 'Aziz', 'Flah', 'aziz@admin.com', '+21655005500', '$2a$12$tsAcKfcu/ESe/HZrZ1Erm.BD.ddG82ZnAMaxZZQ9ty.2/77GWhfTW', 1, 'SUPER_ADMIN', 'c30de0fb-b45e-4317-a0c4-068acc064465'),
('c344005c-6a93-48d9-b40f-86188f501968', 'Aziz1', 'Flah', 'Aziz1@gmail.com', '50320155', '$2b$08$pgl1IlzIFDvzRCDgnPPyMeAT/.hLN.ss8zYvKgrokrPEAraejE2DO', 1, 'ADMIN', 'c30de0fb-b45e-4317-a0c4-068acc064465');

-- --------------------------------------------------------

--
-- Table structure for table `admin_notification`
--

CREATE TABLE `admin_notification` (
  `id` varchar(36) NOT NULL,
  `isSeen` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `notificationId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_notification`
--

INSERT INTO `admin_notification` (`id`, `isSeen`, `createdAt`, `updatedAt`, `notificationId`) VALUES
('9122f2f9-100b-44d9-b44f-8ec38d338123', 0, '2024-05-05 21:13:25.967164', '2024-05-05 21:13:25.967164', '1239b2bc-875f-4f49-b6db-0b8cbc870eb6'),
('c76e84cb-798b-4647-b54c-b09f027a0bb0', 0, '2024-05-08 15:02:53.928984', '2024-05-08 15:02:53.928984', '6b638fe1-57aa-4999-ae82-c31c569209b8');

-- --------------------------------------------------------

--
-- Table structure for table `adress`
--

CREATE TABLE `adress` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `aptNumber` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `isDefault` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `stateId` varchar(36) DEFAULT NULL,
  `clientId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adress`
--

INSERT INTO `adress` (`id`, `firstName`, `lastName`, `streetAddress`, `aptNumber`, `city`, `postalCode`, `isDefault`, `createdAt`, `updatedAt`, `stateId`, `clientId`) VALUES
('1cd83a41-e163-47c2-862f-cae1d3bdeb16', 'k,kj', 'kkk', 'ooo', 'oooo', 'oooo', '6000', 0, '2024-05-05 21:20:45.967532', '2024-05-05 21:20:45.967532', 'e822909a-fc29-11ee-80d8-5405dbedfa15', '6d8b776a-16da-4592-a4fc-44e887ae3ef4');

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE `attribute` (
  `id` varchar(36) NOT NULL,
  `key` varchar(255) NOT NULL,
  `arKey` varchar(255) NOT NULL,
  `type` enum('SINGLE_CHOICE','MULTIPLE_CHOICES') NOT NULL DEFAULT 'SINGLE_CHOICE',
  `isOrdered` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`id`, `key`, `arKey`, `type`, `isOrdered`, `createdAt`, `updatedAt`) VALUES
('1bbdead5-6ceb-425f-baae-ea9efe998f10', 'Size', 'Size', 'SINGLE_CHOICE', 0, '2024-04-16 19:12:28.194219', '2024-05-05 20:37:29.000000');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_choice`
--

CREATE TABLE `attribute_choice` (
  `id` varchar(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `type` enum('COLOR','TEXT') NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `attributeId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_value`
--

CREATE TABLE `attribute_value` (
  `id` varchar(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `attributeId` varchar(36) DEFAULT NULL,
  `simpleProductId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL,
  `variationId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` varchar(36) NOT NULL,
  `type` enum('HOME_HEADER','DEPARTMENT_CARD','DEPARTMENT_HEADER') NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `linkType` enum('PRODUCT','DEPARTMENT','VENDOR') DEFAULT 'PRODUCT',
  `kind` varchar(255) NOT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `simpleProductId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL,
  `departmentId` varchar(36) DEFAULT NULL,
  `vendorId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `type`, `isActive`, `createdAt`, `updatedAt`, `linkType`, `kind`, `imageId`, `simpleProductId`, `parentListingId`, `departmentId`, `vendorId`) VALUES
('3b44b1af-4519-452a-9b8f-5072919d0560', 'HOME_HEADER', 1, '2024-05-05 20:41:52.237593', '2024-05-05 20:41:52.237593', 'DEPARTMENT', 'DEPARTMENT_BANNER', '2cfa8cc7-46a2-4452-89b2-df5db8524caf', NULL, NULL, 'b46cbbf2-a7ba-4f5f-a460-65220072ece2', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `imageId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `createdAt`, `updatedAt`, `imageId`) VALUES
('b4d618d3-1e12-4994-a6aa-5d18b0efc9c9', 'Makarona', '2024-04-16 19:14:01.875537', '2024-04-16 19:14:01.875537', 'd4da1bcc-3769-411c-95ad-55285ce7dabc');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` varchar(36) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `clientId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `createdAt`, `updatedAt`, `clientId`) VALUES
('60a93f9e-4d90-434e-88d4-7559d003fcb7', '2024-04-16 19:06:53.048590', '2024-04-16 19:06:53.048590', '44d246a2-9c9d-4e25-9a5f-7c872fbe7f8d'),
('bf11725d-f5e0-46c2-9156-6d1ae26905d7', '2024-05-05 21:16:37.162887', '2024-05-05 21:16:37.162887', '6d8b776a-16da-4592-a4fc-44e887ae3ef4');

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `id` varchar(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `cartId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_item`
--

INSERT INTO `cart_item` (`id`, `quantity`, `createdAt`, `updatedAt`, `cartId`, `productId`) VALUES
('20d4c786-55a5-4ada-9d19-29c8deec537b', 1, '2024-05-05 21:17:38.123257', '2024-05-05 21:20:43.000000', NULL, 'cca43e0e-bf5e-49e4-8bf8-009252148349'),
('b8b93eb5-cad5-41e5-bbb7-631a37167491', 1, '2024-05-08 14:39:09.395809', '2024-05-08 14:44:56.000000', NULL, 'cca43e0e-bf5e-49e4-8bf8-009252148349');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `kind` varchar(255) NOT NULL,
  `userSendId` varchar(36) DEFAULT NULL,
  `userReceiverId` varchar(36) DEFAULT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `videoId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `child_category`
--

CREATE TABLE `child_category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `arName` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_category`
--

INSERT INTO `child_category` (`id`, `name`, `arName`, `createdAt`, `updatedAt`) VALUES
('95cc6f44-25b6-4773-b87b-08d09cc92eb0', 'Gateau francais', 'Gateau francais', '2024-05-05 20:27:08.850956', '2024-05-05 20:27:08.850956'),
('962c6bac-ef52-42ae-aa28-192109558214', 'Spagetti', 'Spagetti', '2024-04-16 19:12:08.847599', '2024-04-16 19:12:08.847599'),
('981be9f1-10d1-4e8a-9fc3-6f9dc6b9022c', 'Gateau framboisier', 'Gateau framboisier', '2024-05-05 20:27:40.488386', '2024-05-05 20:27:40.488386'),
('d08f3f97-9baa-4357-b516-19a5b49758b9', 'Gateau gouter', 'Gateau gouter', '2024-05-05 20:28:12.994202', '2024-05-05 20:28:12.994202');

-- --------------------------------------------------------

--
-- Table structure for table `child_category_attributes_attribute`
--

CREATE TABLE `child_category_attributes_attribute` (
  `childCategoryId` varchar(36) NOT NULL,
  `attributeId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `child_category_parent_categories_parent_category`
--

CREATE TABLE `child_category_parent_categories_parent_category` (
  `childCategoryId` varchar(36) NOT NULL,
  `parentCategoryId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_category_parent_categories_parent_category`
--

INSERT INTO `child_category_parent_categories_parent_category` (`childCategoryId`, `parentCategoryId`) VALUES
('95cc6f44-25b6-4773-b87b-08d09cc92eb0', '8f1f4651-135d-4313-aad7-8f6000752b6f'),
('981be9f1-10d1-4e8a-9fc3-6f9dc6b9022c', '8f1f4651-135d-4313-aad7-8f6000752b6f'),
('d08f3f97-9baa-4357-b516-19a5b49758b9', '8f1f4651-135d-4313-aad7-8f6000752b6f');

-- --------------------------------------------------------

--
-- Table structure for table `child_category_variation_themes_variation_theme`
--

CREATE TABLE `child_category_variation_themes_variation_theme` (
  `childCategoryId` varchar(36) NOT NULL,
  `variationThemeId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` varchar(36) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `code`, `name`, `createdAt`, `updatedAt`) VALUES
('8e0bcd66-fc28-11ee-80d8-5405dbedfa15', '216', 'Tunisia', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
('9cbda3ef-fc28-11ee-80d8-5405dbedfa15', '1', 'United state', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `deal_product`
--

CREATE TABLE `deal_product` (
  `id` varchar(36) NOT NULL,
  `dealPrice` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `productId` varchar(36) DEFAULT NULL,
  `dealId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `arName` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `imageId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `arName`, `createdAt`, `updatedAt`, `imageId`) VALUES
('b46cbbf2-a7ba-4f5f-a460-65220072ece2', 'Patisserie', 'Patisserie', '2024-05-05 20:19:52.008367', '2024-05-05 20:19:52.008367', 'e5050f74-3777-4e9c-ba10-f839d89fcb30');

-- --------------------------------------------------------

--
-- Table structure for table `featured_department`
--

CREATE TABLE `featured_department` (
  `id` varchar(36) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `departmentId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` varchar(36) NOT NULL,
  `mimetype` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `originalname` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `protected_url` varchar(255) NOT NULL,
  `public_url` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdById` varchar(36) DEFAULT NULL,
  `simpleproductId` varchar(36) DEFAULT NULL,
  `transporterDocumentId` varchar(36) DEFAULT NULL,
  `parentlistingId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `mimetype`, `filename`, `originalname`, `extension`, `size`, `destination`, `protected_url`, `public_url`, `createdAt`, `updatedAt`, `createdById`, `simpleproductId`, `transporterDocumentId`, `parentlistingId`) VALUES
('04ed6a5b-62eb-40f4-9cc8-60ab7b15b65e', 'image/jpeg', 'file-1714939371159.jpeg', 'product-2024-05-05T20:02:51.107Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939371159.jpeg/download', '/public/uploads/file-1714939371159.jpeg', '2024-05-05 21:02:51.183620', '2024-05-05 21:02:51.183620', NULL, NULL, NULL, NULL),
('088358e6-9ea5-4e13-97d2-eab175ae3ee8', 'image/jpeg', 'file-1714939371021.jpeg', 'product-2024-05-05T20:02:50.923Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939371021.jpeg/download', '/public/uploads/file-1714939371021.jpeg', '2024-05-05 21:02:51.053185', '2024-05-05 21:02:51.053185', NULL, NULL, NULL, NULL),
('15fe5cdf-3859-4ca0-959e-96af115a5ce2', 'image/jpeg', 'file-1715174114228.jpeg', 'product-2024-05-08T13:15:14.197Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1715174114228.jpeg/download', '/public/uploads/file-1715174114228.jpeg', '2024-05-08 14:15:14.247414', '2024-05-08 14:15:14.247414', NULL, NULL, NULL, NULL),
('2cfa8cc7-46a2-4452-89b2-df5db8524caf', 'image/jpeg', 'file-1714938112175.jpeg', 'product-2024-05-05T19:41:52.139Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714938112175.jpeg/download', '/public/uploads/file-1714938112175.jpeg', '2024-05-05 20:41:52.190222', '2024-05-05 20:41:52.190222', NULL, NULL, NULL, NULL),
('2dc3a07b-9377-41b1-8051-bdc5de82d295', 'image/jpeg', 'file-1714939959888.jpeg', 'product-2024-05-05T20:12:39.785Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939959888.jpeg/download', '/public/uploads/file-1714939959888.jpeg', '2024-05-05 21:12:39.936068', '2024-05-05 21:12:39.936068', NULL, NULL, NULL, NULL),
('39a683d2-a65f-419c-a484-cd5fa0b3df11', 'image/jpeg', 'file-1714939955689.jpeg', 'product-2024-05-05T20:12:35.668Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714939955689.jpeg/download', '/public/uploads/file-1714939955689.jpeg', '2024-05-05 21:12:35.696055', '2024-05-05 21:12:35.696055', NULL, NULL, NULL, NULL),
('3d9adaa9-1024-485b-9359-fa721d7df343', 'image/jpeg', 'file-1714939951479.jpeg', 'product-2024-05-05T20:12:31.426Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939951479.jpeg/download', '/public/uploads/file-1714939951479.jpeg', '2024-05-05 21:12:31.509755', '2024-05-05 21:12:31.509755', NULL, NULL, NULL, NULL),
('46f40bd8-089c-4a7b-9245-91c53629d497', 'image/jpeg', 'file-1714939959717.jpeg', 'product-2024-05-05T20:12:39.693Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714939959717.jpeg/download', '/public/uploads/file-1714939959717.jpeg', '2024-05-05 21:12:39.723208', '2024-05-05 21:12:39.723208', NULL, NULL, NULL, NULL),
('4f9d90c0-de1b-47c2-add5-b2c456ebc741', 'image/jpeg', 'file-1715176973751.jpeg', 'product-2024-05-08T14:02:53.711Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1715176973751.jpeg/download', '/public/uploads/file-1715176973751.jpeg', '2024-05-08 15:02:53.769973', '2024-05-08 15:02:53.000000', NULL, '3bcb8080-9082-4459-83f0-d618417fc97f', NULL, NULL),
('5546fa72-b4c2-4590-8dae-7a7e61628ca6', 'image/jpeg', 'file-1714939951364.jpeg', 'product-2024-05-05T20:12:31.336Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714939951364.jpeg/download', '/public/uploads/file-1714939951364.jpeg', '2024-05-05 21:12:31.370326', '2024-05-05 21:12:31.370326', NULL, NULL, NULL, NULL),
('5b5d67ce-3f97-493b-8f44-054e62bddcf8', 'image/jpeg', 'file-1713267740334.jpeg', 'product-2024-04-16T11:42:20.241Z.jpeg', 'jpeg', 3195518, 'uploads', '/files/file-1713267740334.jpeg/download', '/public/uploads/file-1713267740334.jpeg', '2024-04-16 12:42:20.390825', '2024-04-16 12:42:20.390825', NULL, NULL, NULL, NULL),
('5befa276-e682-4502-a322-2570f6777b47', 'image/jpeg', 'file-1715176973829.jpeg', 'product-2024-05-08T14:02:53.798Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1715176973829.jpeg/download', '/public/uploads/file-1715176973829.jpeg', '2024-05-08 15:02:53.849631', '2024-05-08 15:02:53.849631', NULL, NULL, NULL, NULL),
('638bc7ed-46e0-4789-b344-448a99c378b6', 'image/jpeg', 'file-1714939983852.jpeg', 'product-2024-05-05T20:13:03.798Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939983852.jpeg/download', '/public/uploads/file-1714939983852.jpeg', '2024-05-05 21:13:03.876493', '2024-05-05 21:13:03.876493', NULL, NULL, NULL, NULL),
('77b07a1e-89b7-4fc1-a484-6e37c77863f5', 'image/jpeg', 'file-1715174114258.jpeg', 'product-2024-05-08T13:15:14.252Z.jpeg', 'jpeg', 37773, 'uploads', '/files/file-1715174114258.jpeg/download', '/public/uploads/file-1715174114258.jpeg', '2024-05-08 14:15:14.262015', '2024-05-08 14:15:14.262015', NULL, NULL, NULL, NULL),
('8129f5b3-50ed-44a6-a6a5-e0950c25e4ea', 'image/jpeg', 'file-1715174114114.jpeg', 'product-2024-05-08T13:15:14.093Z.jpeg', 'jpeg', 7319, 'uploads', '/files/file-1715174114114.jpeg/download', '/public/uploads/file-1715174114114.jpeg', '2024-05-08 14:15:14.124282', '2024-05-08 14:15:14.124282', NULL, NULL, NULL, NULL),
('8f342256-ffa5-465e-94e2-1c5a6eae2907', 'image/jpeg', 'file-1714939983607.jpeg', 'product-2024-05-05T20:13:03.571Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714939983607.jpeg/download', '/public/uploads/file-1714939983607.jpeg', '2024-05-05 21:13:03.648362', '2024-05-05 21:13:03.648362', NULL, NULL, NULL, NULL),
('9e5d5557-e0fc-4d18-af9e-320a4db1938d', 'image/jpeg', 'file-1714939370863.jpeg', 'product-2024-05-05T20:02:50.838Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714939370863.jpeg/download', '/public/uploads/file-1714939370863.jpeg', '2024-05-05 21:02:50.872596', '2024-05-05 21:02:50.872596', NULL, NULL, NULL, NULL),
('a88d851e-3f0f-43ec-b1b1-a9a84479d105', 'image/jpeg', 'file-1714940005785.jpeg', 'product-2024-05-05T20:13:25.724Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714940005785.jpeg/download', '/public/uploads/file-1714940005785.jpeg', '2024-05-05 21:13:25.806453', '2024-05-05 21:13:25.806453', NULL, NULL, NULL, NULL),
('ab4047a3-c942-4d2b-9a90-c254d1511f3b', 'image/jpeg', 'file-1713290991175.jpeg', 'product-2024-04-16T18:09:51.147Z.jpeg', 'jpeg', 1329704, 'uploads', '/files/file-1713290991175.jpeg/download', '/public/uploads/file-1713290991175.jpeg', '2024-04-16 19:09:51.191053', '2024-04-16 19:09:51.191053', NULL, NULL, NULL, NULL),
('abc83cc6-d7fd-4fa8-8ecf-ea4fd0f39618', 'image/jpeg', 'file-1714937136388.jpeg', 'product-2024-05-05T19:25:36.338Z.jpeg', 'jpeg', 37773, 'uploads', '/files/file-1714937136388.jpeg/download', '/public/uploads/file-1714937136388.jpeg', '2024-05-05 20:25:36.397634', '2024-05-05 20:25:36.397634', NULL, NULL, NULL, NULL),
('b623ec75-a9a3-4d2d-bd2b-0de5bdd4e84e', 'image/jpeg', 'file-1714939955806.jpeg', 'product-2024-05-05T20:12:35.753Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939955806.jpeg/download', '/public/uploads/file-1714939955806.jpeg', '2024-05-05 21:12:35.830254', '2024-05-05 21:12:35.830254', NULL, NULL, NULL, NULL),
('be19a938-9e0f-415a-87c7-5b130d53e353', 'image/jpeg', 'file-1714940005661.jpeg', 'product-2024-05-05T20:13:25.630Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714940005661.jpeg/download', '/public/uploads/file-1714940005661.jpeg', '2024-05-05 21:13:25.666873', '2024-05-05 21:13:25.000000', NULL, 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL, NULL),
('c8b53d3b-0987-4ecb-ae1d-9d75075b7854', 'image/jpeg', 'file-1714939352667.jpeg', 'product-2024-05-05T20:02:32.637Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714939352667.jpeg/download', '/public/uploads/file-1714939352667.jpeg', '2024-05-05 21:02:32.676891', '2024-05-05 21:02:32.676891', NULL, NULL, NULL, NULL),
('d199f115-db76-4491-9510-176c28811b97', 'image/jpeg', 'file-1714939353513.jpeg', 'product-2024-05-05T20:02:33.463Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939353513.jpeg/download', '/public/uploads/file-1714939353513.jpeg', '2024-05-05 21:02:33.541689', '2024-05-05 21:02:33.541689', NULL, NULL, NULL, NULL),
('d4da1bcc-3769-411c-95ad-55285ce7dabc', 'image/png', 'file-1713291241814.png', 'product-2024-04-16T18:14:01.745Z.png', 'png', 2472595, 'uploads', '/files/file-1713291241814.png/download', '/public/uploads/file-1713291241814.png', '2024-04-16 19:14:01.834879', '2024-04-16 19:14:01.834879', NULL, NULL, NULL, NULL),
('dfa2e7a2-f862-4fc1-9d5c-8fbba131ceba', 'image/jpeg', 'file-1714939352793.jpeg', 'product-2024-05-05T20:02:32.738Z.jpeg', 'jpeg', 2908432, 'uploads', '/files/file-1714939352793.jpeg/download', '/public/uploads/file-1714939352793.jpeg', '2024-05-05 21:02:32.838471', '2024-05-05 21:02:32.838471', NULL, NULL, NULL, NULL),
('e5050f74-3777-4e9c-ba10-f839d89fcb30', 'image/jpeg', 'file-1714936791931.jpeg', 'product-2024-05-05T19:19:51.897Z.jpeg', 'jpeg', 7319, 'uploads', '/files/file-1714936791931.jpeg/download', '/public/uploads/file-1714936791931.jpeg', '2024-05-05 20:19:51.951665', '2024-05-05 20:19:51.951665', NULL, NULL, NULL, NULL),
('e827c38a-58cf-4daa-bdf9-d70e4671ba14', 'image/jpeg', 'file-1714939353379.jpeg', 'product-2024-05-05T20:02:33.361Z.jpeg', 'jpeg', 36564, 'uploads', '/files/file-1714939353379.jpeg/download', '/public/uploads/file-1714939353379.jpeg', '2024-05-05 21:02:33.390032', '2024-05-05 21:02:33.390032', NULL, NULL, NULL, NULL),
('f5b88c0b-8e57-437b-82fc-62aa1d4ebf4b', 'image/jpeg', 'file-1713291440407.jpeg', 'product-2024-04-16T18:17:20.336Z.jpeg', 'jpeg', 3195518, 'uploads', '/files/file-1713291440407.jpeg/download', '/public/uploads/file-1713291440407.jpeg', '2024-04-16 19:17:20.440476', '2024-04-16 19:17:20.440476', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gain`
--

CREATE TABLE `gain` (
  `id` varchar(36) NOT NULL,
  `description` varchar(255) NOT NULL,
  `percentage` int(11) NOT NULL,
  `type` enum('TRANSACTION','SUBSCRIPTION') NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gain`
--

INSERT INTO `gain` (`id`, `description`, `percentage`, `type`, `createdAt`, `updatedAt`) VALUES
('1bfccf1a-0b16-11ef-80c3-5405dbedfa15', 'Represen', 10, 'TRANSACTION', '2024-05-05 20:31:45.851268', '2024-05-05 20:31:45.851268');

-- --------------------------------------------------------

--
-- Table structure for table `gain_history`
--

CREATE TABLE `gain_history` (
  `id` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL,
  `type` enum('TRANSACTION','SUBSCRIPTION') NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `paymentId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gain_history`
--

INSERT INTO `gain_history` (`id`, `amount`, `type`, `createdAt`, `updatedAt`, `paymentId`) VALUES
('34b5f3a9-888e-4256-ab17-571361f3f5dc', 10, 'TRANSACTION', '2024-05-08 14:44:56.081550', '2024-05-08 14:44:56.081550', '3cdb2edc-857b-4aaf-ac2e-5732fc3a6bc3'),
('7c776e77-7847-4b5f-8039-f2f620f13ccd', 10, 'TRANSACTION', '2024-05-05 21:20:43.578052', '2024-05-05 21:20:43.578052', 'b12cd27d-8b62-49ca-84b0-c0579d078fe9');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` varchar(36) NOT NULL,
  `viewCount` int(11) NOT NULL,
  `lastViewAt` datetime NOT NULL,
  `kind` varchar(255) NOT NULL,
  `clientId` varchar(36) DEFAULT NULL,
  `simpleProductId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `viewCount`, `lastViewAt`, `kind`, `clientId`, `simpleProductId`, `parentListingId`) VALUES
('241efe9c-e516-4d1a-aac0-c01b861933da', 3, '2024-05-08 13:53:21', 'PRODUCT_VIEW_HISTORY', '6d8b776a-16da-4592-a4fc-44e887ae3ef4', 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `idea_list`
--

CREATE TABLE `idea_list` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `clientId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `idea_list_products_product`
--

CREATE TABLE `idea_list_products_product` (
  `ideaListId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `id` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` enum('PENDING','CONFIRMED','WITHDRAWN','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `orderId` varchar(36) DEFAULT NULL,
  `vendorId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`id`, `amount`, `status`, `createdAt`, `updatedAt`, `orderId`, `vendorId`) VALUES
('9a805715-2dee-47a3-a7ac-93234d0725ef', 0, 'PENDING', '2024-05-05 21:20:43.564200', '2024-05-05 21:20:43.564200', '738d3199-2a89-420f-aae9-e6a5898d3360', 'a2577f3f-eed4-4eb7-81c2-b986987a9769'),
('ecf96d25-e32f-444b-a8f6-0c56742ad84d', 0, 'PENDING', '2024-05-08 14:44:56.077433', '2024-05-08 14:44:56.077433', '7be5bed1-ddc2-45a0-910e-79e7f398b231', 'a2577f3f-eed4-4eb7-81c2-b986987a9769');

-- --------------------------------------------------------

--
-- Table structure for table `management_pack`
--

CREATE TABLE `management_pack` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `management_pack`
--

INSERT INTO `management_pack` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('c30de0fb-b45e-4317-a0c4-068acc064465', 'Admin', '2024-05-05 20:34:48.250041', '2024-05-05 20:35:03.000000');

-- --------------------------------------------------------

--
-- Table structure for table `management_pack_permissions_permission`
--

CREATE TABLE `management_pack_permissions_permission` (
  `managementPackId` varchar(36) NOT NULL,
  `permissionId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `management_pack_permissions_permission`
--

INSERT INTO `management_pack_permissions_permission` (`managementPackId`, `permissionId`) VALUES
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bf76bbc-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bf7f2b0-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bf876bd-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bf8e2ef-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bf94e42-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bf9a624-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bf9fd05-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bfa623e-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bfac057-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bfb0854-0b16-11ef-80c3-5405dbedfa15'),
('c30de0fb-b45e-4317-a0c4-068acc064465', '1bfb561f-0b16-11ef-80c3-5405dbedfa15');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` varchar(36) DEFAULT NULL,
  `adminId` varchar(36) DEFAULT NULL,
  `reportId` varchar(36) DEFAULT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `videoId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1653918480565, 'PermissionDefaultData1653918480565'),
(2, 1654690230980, 'platformDefaultSetting1654690230980');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `arTitle` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `arContent` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `type` enum('ORDER','DELIVERY','PRODUCT','REPORT','REVIEW','USER','PAYOUT','CHAT','INCOME') DEFAULT 'ORDER',
  `kind` varchar(255) NOT NULL,
  `orderId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `reportId` varchar(36) DEFAULT NULL,
  `productReviewId` varchar(36) DEFAULT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `payoutId` varchar(36) DEFAULT NULL,
  `chatId` varchar(36) DEFAULT NULL,
  `incomeId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `title`, `arTitle`, `content`, `arContent`, `createdAt`, `updatedAt`, `type`, `kind`, `orderId`, `productId`, `reportId`, `productReviewId`, `userId`, `payoutId`, `chatId`, `incomeId`) VALUES
('03d007ba-20ce-4144-8e8a-768a6e344a4a', 'Product added successfully', 'تمت إضافة المنتج بنجاح', 'Product 3bcb8080-9082-4459-83f0-d618417fc97f added successfully', 'تمت إضافة المنتج 3bcb8080-9082-4459-83f0-d618417fc97f بنجاح', '2024-05-08 15:02:53.921194', '2024-05-08 15:02:53.921194', 'PRODUCT', 'PRODUCT-NOTIFICATION', NULL, '3bcb8080-9082-4459-83f0-d618417fc97f', NULL, NULL, NULL, NULL, NULL, NULL),
('1239b2bc-875f-4f49-b6db-0b8cbc870eb6', 'New product needs verification', 'منتج جديد يحتاج التحقق', 'Product cca43e0e-bf5e-49e4-8bf8-009252148349 needs verification', 'المنتج cca43e0e-bf5e-49e4-8bf8-009252148349 يحتاج إلى التحقق', '2024-05-05 21:13:25.954885', '2024-05-05 21:13:25.954885', 'PRODUCT', 'PRODUCT-NOTIFICATION', NULL, 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL, NULL, NULL, NULL, NULL, NULL),
('2eacd2c9-30a8-464a-b42c-e6b4082a1ac2', 'Product status updated', 'تم تحديث حالة المنتج', 'Product cca43e0e-bf5e-49e4-8bf8-009252148349 status updated', 'تم تحديث حالة المنتج cca43e0e-bf5e-49e4-8bf8-009252148349', '2024-05-05 21:14:21.198904', '2024-05-05 21:14:21.198904', 'PRODUCT', 'PRODUCT-NOTIFICATION', NULL, 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL, NULL, NULL, NULL, NULL, NULL),
('376ae87b-91ce-402e-b310-0021c099bc09', 'Account status updated', 'تم تحديث حالة الحساب', 'Your account is verified', 'تم التحقق من حسابك', '2024-04-16 20:33:55.517502', '2024-04-16 20:33:55.517502', 'USER', 'USER-NOTIFICATION', NULL, NULL, NULL, NULL, 'b65b625e-88f8-40a9-8e26-6ebf50934a0d', NULL, NULL, NULL),
('387c8b69-0fc1-4df1-b8a1-22318be92948', 'Order paid successfully', 'تم دفع الطلب بنجاح', 'order 738d3199-2a89-420f-aae9-e6a5898d3360 paid successfully', 'طلب 738d3199-2a89-420f-aae9-e6a5898d3360 مدفوع بنجاح', '2024-05-05 21:20:45.984690', '2024-05-05 21:20:45.984690', 'ORDER', 'ORDER-NOTIFICATION', '738d3199-2a89-420f-aae9-e6a5898d3360', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('4bf8793c-ae81-4ca0-b737-28180f9f735d', 'Welcome to m3iklia', 'مرحبا بكم في سوق المعقلية', 'Your account successfully created', 'تم إنشاء حسابك بنجاح', '2024-05-08 14:11:18.986241', '2024-05-08 14:11:18.986241', 'USER', 'USER-NOTIFICATION', NULL, NULL, NULL, NULL, '6fdd6c0c-6153-4bd3-a875-18440dbcbcff', NULL, NULL, NULL),
('5e6f7841-1b47-471c-b951-8f39d2d1afde', 'Account status updated', 'تم تحديث حالة الحساب', 'Your account is verified', 'تم التحقق من حسابك', '2024-05-05 20:58:52.219122', '2024-05-05 20:58:52.219122', 'USER', 'USER-NOTIFICATION', NULL, NULL, NULL, NULL, 'a2577f3f-eed4-4eb7-81c2-b986987a9769', NULL, NULL, NULL),
('6b638fe1-57aa-4999-ae82-c31c569209b8', 'New product needs verification', 'منتج جديد يحتاج التحقق', 'Product 3bcb8080-9082-4459-83f0-d618417fc97f needs verification', 'المنتج 3bcb8080-9082-4459-83f0-d618417fc97f يحتاج إلى التحقق', '2024-05-08 15:02:53.922368', '2024-05-08 15:02:53.922368', 'PRODUCT', 'PRODUCT-NOTIFICATION', NULL, '3bcb8080-9082-4459-83f0-d618417fc97f', NULL, NULL, NULL, NULL, NULL, NULL),
('79faef1d-6f58-42ef-b69d-9f9ca93427ad', 'Order paid successfully', 'تم دفع الطلب بنجاح', 'order 738d3199-2a89-420f-aae9-e6a5898d3360 paid successfully', 'طلب 738d3199-2a89-420f-aae9-e6a5898d3360 مدفوع بنجاح', '2024-05-05 21:20:45.985954', '2024-05-05 21:20:45.985954', 'ORDER', 'ORDER-NOTIFICATION', '738d3199-2a89-420f-aae9-e6a5898d3360', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('7a2af8bc-d9ce-43bb-a3de-7ada3c231f01', 'Welcome to m3iklia', 'مرحبا بكم في سوق المعقلية', 'Your account successfully created', 'تم إنشاء حسابك بنجاح', '2024-05-05 21:16:37.170907', '2024-05-05 21:16:37.170907', 'USER', 'USER-NOTIFICATION', NULL, NULL, NULL, NULL, '6d8b776a-16da-4592-a4fc-44e887ae3ef4', NULL, NULL, NULL),
('b541f88a-61e3-4208-9b60-251e8340648b', 'Product status updated', 'تم تحديث حالة المنتج', 'Product 3bcb8080-9082-4459-83f0-d618417fc97f status updated', 'تم تحديث حالة المنتج 3bcb8080-9082-4459-83f0-d618417fc97f', '2024-05-08 15:03:44.073831', '2024-05-08 15:03:44.073831', 'PRODUCT', 'PRODUCT-NOTIFICATION', NULL, '3bcb8080-9082-4459-83f0-d618417fc97f', NULL, NULL, NULL, NULL, NULL, NULL),
('c3120e7e-4e50-49f8-9f4d-0c932f4fc060', 'Order paid successfully', 'تم دفع الطلب بنجاح', 'order 7be5bed1-ddc2-45a0-910e-79e7f398b231 paid successfully', 'طلب 7be5bed1-ddc2-45a0-910e-79e7f398b231 مدفوع بنجاح', '2024-05-08 14:44:58.374650', '2024-05-08 14:44:58.374650', 'ORDER', 'ORDER-NOTIFICATION', '7be5bed1-ddc2-45a0-910e-79e7f398b231', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('c9139841-c051-43ee-b26c-bbd9343634a2', 'Order paid successfully', 'تم دفع الطلب بنجاح', 'order 7be5bed1-ddc2-45a0-910e-79e7f398b231 paid successfully', 'طلب 7be5bed1-ddc2-45a0-910e-79e7f398b231 مدفوع بنجاح', '2024-05-08 14:44:58.374014', '2024-05-08 14:44:58.374014', 'ORDER', 'ORDER-NOTIFICATION', '7be5bed1-ddc2-45a0-910e-79e7f398b231', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('e2d7a95b-9327-41c3-8331-a95b9b9b1e7b', 'Welcome to m3iklia', 'مرحبا بكم في سوق المعقلية', 'Your account successfully created', 'تم إنشاء حسابك بنجاح', '2024-04-16 20:33:18.358260', '2024-04-16 20:33:18.358260', 'USER', 'USER-NOTIFICATION', NULL, NULL, NULL, NULL, 'b65b625e-88f8-40a9-8e26-6ebf50934a0d', NULL, NULL, NULL),
('e666ab5e-efad-4e70-93d9-226bfd81520d', 'Welcome to m3iklia', 'مرحبا بكم في سوق المعقلية', 'Your account successfully created', 'تم إنشاء حسابك بنجاح', '2024-05-05 20:52:37.997802', '2024-05-05 20:52:37.997802', 'USER', 'USER-NOTIFICATION', NULL, NULL, NULL, NULL, 'a2577f3f-eed4-4eb7-81c2-b986987a9769', NULL, NULL, NULL),
('f3cde391-fbc5-4420-ae9d-e61557561bb3', 'Product added successfully', 'تمت إضافة المنتج بنجاح', 'Product cca43e0e-bf5e-49e4-8bf8-009252148349 added successfully', 'تمت إضافة المنتج cca43e0e-bf5e-49e4-8bf8-009252148349 بنجاح', '2024-05-05 21:13:25.953883', '2024-05-05 21:13:25.953883', 'PRODUCT', 'PRODUCT-NOTIFICATION', NULL, 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL, NULL, NULL, NULL, NULL, NULL),
('fe252608-b5b1-4b0e-a3c0-3ea714f21cd4', 'Welcome to m3iklia', 'مرحبا بكم في سوق المعقلية', 'Your account successfully created', 'تم إنشاء حسابك بنجاح', '2024-04-16 19:06:53.064141', '2024-04-16 19:06:53.064141', 'USER', 'USER-NOTIFICATION', NULL, NULL, NULL, NULL, '44d246a2-9c9d-4e25-9a5f-7c872fbe7f8d', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` varchar(36) NOT NULL,
  `suggestedPrice` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` varchar(36) NOT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `totalPrice` int(11) DEFAULT NULL,
  `platformGainPercentage` int(11) NOT NULL,
  `status` enum('PENDING','ORDERED','PREPARED','INDELIVERY','DELIVERED','CANCELED') NOT NULL DEFAULT 'PENDING',
  `shippingAmount` int(11) NOT NULL,
  `orderedAt` datetime DEFAULT NULL,
  `deliveredAt` datetime DEFAULT NULL,
  `canceledAt` datetime DEFAULT NULL,
  `deliveryStartedAt` datetime DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `assignedTransporterId` varchar(36) DEFAULT NULL,
  `clientId` varchar(36) DEFAULT NULL,
  `vendorId` varchar(36) DEFAULT NULL,
  `vendorStateId` varchar(36) DEFAULT NULL,
  `paymentInfoId` varchar(36) DEFAULT NULL,
  `shippingInfoId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `orderId`, `totalPrice`, `platformGainPercentage`, `status`, `shippingAmount`, `orderedAt`, `deliveredAt`, `canceledAt`, `deliveryStartedAt`, `createdAt`, `updatedAt`, `assignedTransporterId`, `clientId`, `vendorId`, `vendorStateId`, `paymentInfoId`, `shippingInfoId`) VALUES
('738d3199-2a89-420f-aae9-e6a5898d3360', '17149404435130', 10, 10, 'PREPARED', 10, NULL, NULL, NULL, NULL, '2024-05-05 21:20:43.514247', '2024-05-05 21:21:54.000000', NULL, '6d8b776a-16da-4592-a4fc-44e887ae3ef4', 'a2577f3f-eed4-4eb7-81c2-b986987a9769', NULL, 'b12cd27d-8b62-49ca-84b0-c0579d078fe9', 'ae6f4bbd-d9eb-47f7-a496-9e21667b38c3'),
('7be5bed1-ddc2-45a0-910e-79e7f398b231', '17151758960550', 10, 10, 'PREPARED', 10, NULL, NULL, NULL, NULL, '2024-05-08 14:44:56.056492', '2024-05-08 14:52:52.000000', NULL, '6d8b776a-16da-4592-a4fc-44e887ae3ef4', 'a2577f3f-eed4-4eb7-81c2-b986987a9769', NULL, '3cdb2edc-857b-4aaf-ac2e-5732fc3a6bc3', '1b15a507-f729-42aa-81aa-00aeb0d6941d');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` varchar(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `itemPrice` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `productId` varchar(36) DEFAULT NULL,
  `dealProductId` varchar(36) DEFAULT NULL,
  `orderId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `quantity`, `itemPrice`, `createdAt`, `updatedAt`, `productId`, `dealProductId`, `orderId`) VALUES
('580321ab-6f2c-4309-a84d-e6123f6b6e6e', 1, 10, '2024-05-08 14:44:56.058455', '2024-05-08 14:44:56.058455', 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL, '7be5bed1-ddc2-45a0-910e-79e7f398b231'),
('93d0e181-0d1a-4711-a4f5-26576c7be119', 1, 10, '2024-05-05 21:20:43.520867', '2024-05-05 21:20:43.520867', 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL, '738d3199-2a89-420f-aae9-e6a5898d3360');

-- --------------------------------------------------------

--
-- Table structure for table `parent_category`
--

CREATE TABLE `parent_category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `arName` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `imageId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_category`
--

INSERT INTO `parent_category` (`id`, `name`, `arName`, `createdAt`, `updatedAt`, `imageId`) VALUES
('7117f96e-f6d6-4089-8fd4-f06dd2926bdf', 'Frite', 'Frite', '2024-04-16 19:09:51.215851', '2024-04-16 19:09:51.215851', 'ab4047a3-c942-4d2b-9a90-c254d1511f3b'),
('8f1f4651-135d-4313-aad7-8f6000752b6f', 'Gateau', 'Gateau', '2024-05-05 20:25:36.443644', '2024-05-05 20:25:36.443644', 'abc83cc6-d7fd-4fa8-8ecf-ea4fd0f39618'),
('bc9ca4fe-8c92-4563-bdd9-f3782b1ba238', 'Pizza', 'Pizza', '2024-04-16 12:42:20.442571', '2024-04-16 12:42:20.442571', '5b5d67ce-3f97-493b-8f44-054e62bddcf8');

-- --------------------------------------------------------

--
-- Table structure for table `parent_category_departments_department`
--

CREATE TABLE `parent_category_departments_department` (
  `parentCategoryId` varchar(36) NOT NULL,
  `departmentId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_category_departments_department`
--

INSERT INTO `parent_category_departments_department` (`parentCategoryId`, `departmentId`) VALUES
('8f1f4651-135d-4313-aad7-8f6000752b6f', 'b46cbbf2-a7ba-4f5f-a460-65220072ece2'),
('bc9ca4fe-8c92-4563-bdd9-f3782b1ba238', 'b46cbbf2-a7ba-4f5f-a460-65220072ece2');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` varchar(36) NOT NULL,
  `paid` tinyint(4) NOT NULL,
  `paidAmount` int(11) NOT NULL,
  `feeAmount` int(11) NOT NULL,
  `type` enum('STRIPE') NOT NULL DEFAULT 'STRIPE',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `paid`, `paidAmount`, `feeAmount`, `type`, `createdAt`, `updatedAt`) VALUES
('3cdb2edc-857b-4aaf-ac2e-5732fc3a6bc3', 1, 20, 0, 'STRIPE', '2024-05-08 14:44:56.079392', '2024-05-08 14:44:56.079392'),
('b12cd27d-8b62-49ca-84b0-c0579d078fe9', 1, 20, 0, 'STRIPE', '2024-05-05 21:20:43.569759', '2024-05-05 21:20:43.569759');

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `balance` int(11) DEFAULT NULL,
  `last4` varchar(255) DEFAULT NULL,
  `exp_month` varchar(255) DEFAULT NULL,
  `exp_year` varchar(255) DEFAULT NULL,
  `nameOnCard` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `address_zip` varchar(255) DEFAULT NULL,
  `stripeId` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `bankRoutingNumber` int(11) DEFAULT NULL,
  `accountNumber` int(11) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `kind` varchar(255) NOT NULL,
  `clientId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_platform`
--

CREATE TABLE `payment_platform` (
  `id` varchar(36) NOT NULL,
  `papalName` varchar(255) DEFAULT NULL,
  `papalNumber` int(11) DEFAULT NULL,
  `stripeName` varchar(255) DEFAULT NULL,
  `stripeNumber` int(11) DEFAULT NULL,
  `bankName` varchar(255) DEFAULT NULL,
  `bankNumber` int(11) DEFAULT NULL,
  `type` enum('STRIPE','PAYPAL','BankAcount') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payout`
--

CREATE TABLE `payout` (
  `id` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `accountNumber` varchar(255) NOT NULL,
  `ibanNumber` varchar(255) NOT NULL,
  `rejectMessage` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','INREVIEW','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdById` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('1bf76bbc-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-SELLER', '2024-05-05 20:31:45.815940', '2024-05-05 20:31:45.815940'),
('1bf7f2b0-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-CUSTOMER', '2024-05-05 20:31:45.819393', '2024-05-05 20:31:45.819393'),
('1bf876bd-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-PRODUCT', '2024-05-05 20:31:45.822418', '2024-05-05 20:31:45.822418'),
('1bf8e2ef-0b16-11ef-80c3-5405dbedfa15', 'VIEW-PLATFORM-REVENUE', '2024-05-05 20:31:45.825542', '2024-05-05 20:31:45.825542'),
('1bf94e42-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-REPORT', '2024-05-05 20:31:45.828309', '2024-05-05 20:31:45.828309'),
('1bf9a624-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-PAYOUT', '2024-05-05 20:31:45.830569', '2024-05-05 20:31:45.830569'),
('1bf9fd05-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-CONTENT', '2024-05-05 20:31:45.832763', '2024-05-05 20:31:45.832763'),
('1bfa623e-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-BRAND', '2024-05-05 20:31:45.835377', '2024-05-05 20:31:45.835377'),
('1bfac057-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-AD', '2024-05-05 20:31:45.837790', '2024-05-05 20:31:45.837790'),
('1bfb0854-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-ORDER', '2024-05-05 20:31:45.839611', '2024-05-05 20:31:45.839611'),
('1bfb561f-0b16-11ef-80c3-5405dbedfa15', 'MANAGE-TRANSPORTER', '2024-05-05 20:31:45.841599', '2024-05-05 20:31:45.841599');

-- --------------------------------------------------------

--
-- Table structure for table `permission_management_packs_management_pack`
--

CREATE TABLE `permission_management_packs_management_pack` (
  `permissionId` varchar(36) NOT NULL,
  `managementPackId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `condition` enum('USED_GOOD','USER_LIKE_NEW','NEW','USED_VER_GOOD','USED_ACCEPTABLE') DEFAULT 'NEW',
  `productId` varchar(255) DEFAULT NULL,
  `productIdType` enum('GTIN','EAN','GCID','ISBN','UPC','ASIN') DEFAULT NULL,
  `arName` varchar(255) DEFAULT NULL,
  `isApproved` tinyint(4) DEFAULT 0,
  `rating` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `searchTerms` text DEFAULT NULL,
  `legalDisclaimer` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `manufactureSerial` varchar(255) DEFAULT NULL,
  `type` enum('SIMPLE_LISTING','PARENT_LISTING','VARIATION') DEFAULT 'SIMPLE_LISTING',
  `isActive` tinyint(4) DEFAULT 0,
  `rejectReason` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `kind` varchar(255) NOT NULL,
  `childCategoryId` varchar(36) DEFAULT NULL,
  `customBrandId` varchar(36) DEFAULT NULL,
  `clientsId` varchar(36) DEFAULT NULL,
  `vendorId` varchar(36) DEFAULT NULL,
  `primaryImageId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL,
  `variationThemeId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `status`, `quantity`, `price`, `condition`, `productId`, `productIdType`, `arName`, `isApproved`, `rating`, `name`, `description`, `searchTerms`, `legalDisclaimer`, `brand`, `manufacturer`, `manufactureSerial`, `type`, `isActive`, `rejectReason`, `createdAt`, `updatedAt`, `kind`, `childCategoryId`, `customBrandId`, `clientsId`, `vendorId`, `primaryImageId`, `parentListingId`, `variationThemeId`) VALUES
('3bcb8080-9082-4459-83f0-d618417fc97f', 'APPROVED', 100, 10, 'NEW', '4566666', 'UPC', 'GG', 1, NULL, 'GG', 'TTTTT', 'TTT', 'TTT', 'TESTO', 'TEST', '1111111', 'SIMPLE_LISTING', 1, NULL, '2024-05-08 15:02:53.874720', '2024-05-08 15:03:44.000000', 'SIMPLE_PRODUCT', '95cc6f44-25b6-4773-b87b-08d09cc92eb0', NULL, NULL, 'a2577f3f-eed4-4eb7-81c2-b986987a9769', '5befa276-e682-4502-a322-2570f6777b47', NULL, NULL),
('cca43e0e-bf5e-49e4-8bf8-009252148349', 'APPROVED', 98, 10, 'NEW', '123456', 'GTIN', 'Gateau', 1, NULL, 'Gateau', 'testo', 'test', 'lllll', 'Gateau', 'TN', 'TN', 'SIMPLE_LISTING', 1, NULL, '2024-05-05 21:13:25.869127', '2024-05-08 14:44:56.000000', 'SIMPLE_PRODUCT', '95cc6f44-25b6-4773-b87b-08d09cc92eb0', NULL, NULL, 'a2577f3f-eed4-4eb7-81c2-b986987a9769', 'a88d851e-3f0f-43ec-b1b1-a9a84479d105', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute_choices_attribute_choice`
--

CREATE TABLE `product_attribute_choices_attribute_choice` (
  `productId` varchar(36) NOT NULL,
  `attributeChoiceId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_coupons_promotinal_offer`
--

CREATE TABLE `product_coupons_promotinal_offer` (
  `productId` varchar(36) NOT NULL,
  `promotinalOfferId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_feature`
--

CREATE TABLE `product_feature` (
  `id` varchar(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `simpleProductId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_feature`
--

INSERT INTO `product_feature` (`id`, `value`, `createdAt`, `updatedAt`, `simpleProductId`, `parentListingId`) VALUES
('2be0b013-d662-489e-b5d6-7a5016481715', 't', '2024-05-05 21:13:25.903507', '2024-05-05 21:13:25.903507', 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL),
('aa42d3d2-4625-4211-a69d-839a5b99f5c4', 'T', '2024-05-08 15:02:53.890816', '2024-05-08 15:02:53.890816', '3bcb8080-9082-4459-83f0-d618417fc97f', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_key_word`
--

CREATE TABLE `product_key_word` (
  `id` varchar(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `simpleProductId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_key_word`
--

INSERT INTO `product_key_word` (`id`, `value`, `createdAt`, `updatedAt`, `simpleProductId`, `parentListingId`) VALUES
('584ac01b-53f4-41f6-a55e-e4faf8a9417a', 'TTTTT', '2024-05-08 15:02:53.894583', '2024-05-08 15:02:53.894583', '3bcb8080-9082-4459-83f0-d618417fc97f', NULL),
('bc171c06-e10a-4ec4-b383-1bb347cfb68b', 'kkkkk', '2024-05-05 21:13:25.906077', '2024-05-05 21:13:25.906077', 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_promotions_promotinal_offer`
--

CREATE TABLE `product_promotions_promotinal_offer` (
  `productId` varchar(36) NOT NULL,
  `promotinalOfferId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_registry_details`
--

CREATE TABLE `product_registry_details` (
  `id` varchar(36) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `isMostWanted` tinyint(4) NOT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `registryId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_review`
--

CREATE TABLE `product_review` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `clientId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variation_attribute_choices_attribute_choice`
--

CREATE TABLE `product_variation_attribute_choices_attribute_choice` (
  `productId` varchar(36) NOT NULL,
  `attributeChoiceId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_warning`
--

CREATE TABLE `product_warning` (
  `id` varchar(36) NOT NULL,
  `value` enum('ChokingHazardContainsAMarble','ChokingHazardIsASmallBall','ChokingHazardIsAMarble','ChokingHazardContainsSmallBall','ChokingHazardBalloon','NoWarningApplicable','ContainsSmallMagnets') NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `simpleProductId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_warning`
--

INSERT INTO `product_warning` (`id`, `value`, `createdAt`, `updatedAt`, `simpleProductId`, `parentListingId`) VALUES
('484e2002-d3bc-48c3-8d6e-7fcb106def03', 'ChokingHazardIsASmallBall', '2024-05-05 21:13:25.909588', '2024-05-05 21:13:25.909588', 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL),
('842141cb-0e98-4ea5-988e-1e802ff99994', 'ChokingHazardBalloon', '2024-05-08 15:02:53.896858', '2024-05-08 15:02:53.896858', '3bcb8080-9082-4459-83f0-d618417fc97f', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_wish_details`
--

CREATE TABLE `product_wish_details` (
  `id` varchar(36) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `needs` int(11) NOT NULL,
  `has` int(11) NOT NULL,
  `priority` enum('HIGH','MEDIUM','LOW') NOT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `wishListId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotinal_offer`
--

CREATE TABLE `promotinal_offer` (
  `id` varchar(36) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `redemptionLimit` tinyint(4) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `type` enum('POURCENTAGE','BUYONEANDGETONE') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `minQuantity` int(11) DEFAULT NULL,
  `dealType` enum('WEEKDEAL','LIGHTDEAL') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `budget` int(11) DEFAULT NULL,
  `kind` varchar(255) NOT NULL,
  `vendorId` varchar(36) DEFAULT NULL,
  `clientId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotinal_offer_applies_to_product`
--

CREATE TABLE `promotinal_offer_applies_to_product` (
  `promotinalOfferId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `productId` varchar(36) DEFAULT NULL,
  `clientId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registry`
--

CREATE TABLE `registry` (
  `id` varchar(36) NOT NULL,
  `date` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `Privacy` tinyint(4) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `partnerFirstName` varchar(255) DEFAULT NULL,
  `partnerLastName` varchar(255) DEFAULT NULL,
  `giftNumber` int(11) DEFAULT NULL,
  `isFirstChild` tinyint(4) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `giftListName` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `isHidden` tinyint(4) DEFAULT NULL,
  `gifterFirstName` varchar(255) DEFAULT NULL,
  `gifterLastName` varchar(255) DEFAULT NULL,
  `kind` varchar(255) NOT NULL,
  `clientsId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` varchar(36) NOT NULL,
  `status` enum('PENDING','INREVIEW','ACCEPTED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `kind` varchar(255) NOT NULL,
  `createdById` varchar(36) DEFAULT NULL,
  `assignedAdminId` varchar(36) DEFAULT NULL,
  `orderId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `questionId` varchar(36) DEFAULT NULL,
  `usersId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saved_items`
--

CREATE TABLE `saved_items` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `clientId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saved_items_products_product`
--

CREATE TABLE `saved_items_products_product` (
  `savedItemsId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `aptNumber` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `stateId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping`
--

INSERT INTO `shipping` (`id`, `firstName`, `lastName`, `streetAddress`, `aptNumber`, `city`, `postalCode`, `createdAt`, `updatedAt`, `stateId`) VALUES
('1b15a507-f729-42aa-81aa-00aeb0d6941d', 'k,kj', 'kkk', 'ooo', 'oooo', 'oooo', '6000', '2024-05-08 14:44:56.047825', '2024-05-08 14:44:56.047825', 'e822909a-fc29-11ee-80d8-5405dbedfa15'),
('ae6f4bbd-d9eb-47f7-a496-9e21667b38c3', 'k,kj', 'kkk', 'ooo', 'oooo', 'oooo', '6000', '2024-05-05 21:20:43.505863', '2024-05-05 21:20:43.505863', 'e822909a-fc29-11ee-80d8-5405dbedfa15');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_cost`
--

CREATE TABLE `shipping_cost` (
  `id` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL,
  `type` enum('SAME_ZONE','DIFFERENT_ZONE') NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_cost`
--

INSERT INTO `shipping_cost` (`id`, `amount`, `type`, `createdAt`, `updatedAt`) VALUES
('1bfdb2cd-0b16-11ef-80c3-5405dbedfa15', 10, 'SAME_ZONE', '2024-05-05 20:31:45.857106', '2024-05-05 20:31:45.857106'),
('1bfdfc3d-0b16-11ef-80c3-5405dbedfa15', 20, 'DIFFERENT_ZONE', '2024-05-05 20:31:45.858987', '2024-05-05 20:31:45.858987');

-- --------------------------------------------------------

--
-- Table structure for table `specification`
--

CREATE TABLE `specification` (
  `id` varchar(36) NOT NULL,
  `key` varchar(255) NOT NULL,
  `arKey` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `simpleProductId` varchar(36) DEFAULT NULL,
  `parentListingId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specification`
--

INSERT INTO `specification` (`id`, `key`, `arKey`, `value`, `createdAt`, `updatedAt`, `simpleProductId`, `parentListingId`) VALUES
('a34bbfb5-79c7-4f97-9940-f26834047ccc', 'BIG', 'BIG', 'TTTTT', '2024-05-08 15:02:53.901561', '2024-05-08 15:02:53.000000', '3bcb8080-9082-4459-83f0-d618417fc97f', NULL),
('ea2ee4f7-2e3f-422c-bea2-7cf0bca01863', 'kkk', 'klkl', ',,,kk', '2024-05-05 21:13:25.916909', '2024-05-05 21:13:25.000000', 'cca43e0e-bf5e-49e4-8bf8-009252148349', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `countryId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `name`, `createdAt`, `updatedAt`, `countryId`) VALUES
('e822909a-fc29-11ee-80d8-5405dbedfa15', 'Gabes', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', '8e0bcd66-fc28-11ee-80d8-5405dbedfa15'),
('e822a5f8-fc29-11ee-80d8-5405dbedfa15', 'Sousse', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', '8e0bcd66-fc28-11ee-80d8-5405dbedfa15');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` varchar(36) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `kind` enum('INDIVIDUAL','PROFESSIONAL') NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `price`, `description`, `kind`, `createdAt`, `updatedAt`) VALUES
('1bfe5a24-0b16-11ef-80c3-5405dbedfa15', 10, 'Pay per product', 'INDIVIDUAL', '2024-05-05 20:31:45.861075', '2024-05-05 20:31:45.861075'),
('1bfea8bb-0b16-11ef-80c3-5405dbedfa15', 10, 'Monthly subscription', 'PROFESSIONAL', '2024-05-05 20:31:45.863373', '2024-05-05 20:31:45.863373');

-- --------------------------------------------------------

--
-- Table structure for table `tier_promotions`
--

CREATE TABLE `tier_promotions` (
  `id` varchar(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `promotionId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `dateBirth` datetime DEFAULT NULL,
  `isEmailVerfied` tinyint(4) NOT NULL DEFAULT 0,
  `stripeId` varchar(255) DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `role` varchar(255) DEFAULT 'CUSTOMER',
  `vendorState` enum('UNVERIFIED','VERIFIED','SUSPENDED','DISABLED') DEFAULT 'UNVERIFIED',
  `isBusinessInfoFullfilled` tinyint(4) DEFAULT 0,
  `isSellerInfoFullfilled` tinyint(4) DEFAULT 0,
  `isPersonalInfoFullfilled` tinyint(4) DEFAULT 0,
  `isMarketPlaceFullfilled` tinyint(4) DEFAULT 0,
  `isBillingFullfilled` tinyint(4) DEFAULT 0,
  `isStoreFullfilled` tinyint(4) DEFAULT 0,
  `isVerificationFullfilled` tinyint(4) DEFAULT 0,
  `businessType` enum('CHARITY','STATE','PRIVATE','INDIVIDUAL','PUBLIC') DEFAULT NULL,
  `verificationLanguage` enum('Arabic','English') DEFAULT NULL,
  `personalCountry` varchar(255) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `driveLicenceExpiry` datetime DEFAULT NULL,
  `status` enum('PENDING','ORDERED','PREPARED','INDELIVERY','DELIVERED','CANCELED') DEFAULT 'PENDING',
  `kind` varchar(255) NOT NULL,
  `productsId` varchar(36) DEFAULT NULL,
  `accountGiftCardId` varchar(36) DEFAULT NULL,
  `savedItemsId` varchar(36) DEFAULT NULL,
  `businessCountryId` varchar(36) DEFAULT NULL,
  `businessStateId` varchar(36) DEFAULT NULL,
  `identityFrontId` varchar(36) DEFAULT NULL,
  `identityBackId` varchar(36) DEFAULT NULL,
  `statementDocumentId` varchar(36) DEFAULT NULL,
  `driveLicenceId` varchar(36) DEFAULT NULL,
  `businessAdressAdressline` varchar(255) DEFAULT NULL,
  `businessAdressAdressline2` varchar(255) DEFAULT NULL,
  `businessAdressCity` varchar(255) DEFAULT NULL,
  `businessAdressPostalcode` varchar(255) DEFAULT NULL,
  `accountBankname` varchar(255) DEFAULT NULL,
  `accountAccountnumber` varchar(255) DEFAULT NULL,
  `accountIbannumber` varchar(255) DEFAULT NULL,
  `accountAvailablebalance` int(11) DEFAULT 0,
  `accountPendingbalance` int(11) DEFAULT 0,
  `businessInfoBusinessname` varchar(255) DEFAULT NULL,
  `businessInfoNumbercompany` varchar(255) DEFAULT NULL,
  `businessInfoStorename` varchar(255) DEFAULT NULL,
  `businessInfoStoredescription` longtext DEFAULT NULL,
  `personnalInfoPersonnalcity` varchar(255) DEFAULT NULL,
  `personnalInfoPersonnalcountrybirth` varchar(255) DEFAULT NULL,
  `personnalInfoProofidentity` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `phone`, `gender`, `password`, `otp`, `dateBirth`, `isEmailVerfied`, `stripeId`, `isActive`, `createdAt`, `updatedAt`, `role`, `vendorState`, `isBusinessInfoFullfilled`, `isSellerInfoFullfilled`, `isPersonalInfoFullfilled`, `isMarketPlaceFullfilled`, `isBillingFullfilled`, `isStoreFullfilled`, `isVerificationFullfilled`, `businessType`, `verificationLanguage`, `personalCountry`, `active`, `driveLicenceExpiry`, `status`, `kind`, `productsId`, `accountGiftCardId`, `savedItemsId`, `businessCountryId`, `businessStateId`, `identityFrontId`, `identityBackId`, `statementDocumentId`, `driveLicenceId`, `businessAdressAdressline`, `businessAdressAdressline2`, `businessAdressCity`, `businessAdressPostalcode`, `accountBankname`, `accountAccountnumber`, `accountIbannumber`, `accountAvailablebalance`, `accountPendingbalance`, `businessInfoBusinessname`, `businessInfoNumbercompany`, `businessInfoStorename`, `businessInfoStoredescription`, `personnalInfoPersonnalcity`, `personnalInfoPersonnalcountrybirth`, `personnalInfoProofidentity`) VALUES
('44d246a2-9c9d-4e25-9a5f-7c872fbe7f8d', 'iheb', 'ali', 'iheb@gmail.com', '+21650320136', NULL, '$2b$08$.xbit3xYABAfe99y1zpNkee.kqfpy1hE98khQYu0y6Gh9cYN9uTC6', '200927', NULL, 0, 'cus_Pw8gFfeKRnhQow', 1, '2024-04-16 19:06:53.024212', '2024-04-16 19:06:53.000000', 'CUSTOMER', 'UNVERIFIED', 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 1, NULL, 'PENDING', 'Client', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('6d8b776a-16da-4592-a4fc-44e887ae3ef4', 'test', 'test', 'test1@gmail.com', '50300122', NULL, '$2b$08$g1qsq.iYw.nGCGnhP4e3tu/rZD85OWdfnVsE8RTZM7XJX7kkpZOrK', '763190', NULL, 0, 'cus_Q3I4hdbwIi3heA', 1, '2024-05-05 21:16:37.147453', '2024-05-05 21:16:37.000000', 'CUSTOMER', 'UNVERIFIED', 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 1, NULL, 'PENDING', 'Client', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('6fdd6c0c-6153-4bd3-a875-18440dbcbcff', 'testo', 'testo', 'testo@gmail.com', '50320182', NULL, '$2b$08$dovkXftKeYUFVEI/fxZlQ.Exlt1m2adpI6/Bc8UUHxRmboOs4Nssy', '541643', '2024-05-22 23:00:00', 0, 'cus_Q4ItusEO9MHjZx', 1, '2024-05-08 14:11:18.173155', '2024-05-08 14:15:14.000000', 'CUSTOMER', 'UNVERIFIED', 1, 1, 1, 0, 1, 1, 1, 'PRIVATE', 'Arabic', NULL, 1, NULL, 'PENDING', 'Vendor', NULL, NULL, NULL, '8e0bcd66-fc28-11ee-80d8-5405dbedfa15', 'e822909a-fc29-11ee-80d8-5405dbedfa15', '8129f5b3-50ed-44a6-a6a5-e0950c25e4ea', '15fe5cdf-3859-4ca0-959e-96af115a5ce2', '77b07a1e-89b7-4fc1-a484-6e37c77863f5', NULL, '10', '10', '10', '6000', 'biat', 'a10', '10', 0, 0, 'Aziz', '10', 'Aizi', 'test', '8e0bcd66-fc28-11ee-80d8-5405dbedfa15', NULL, 'DRIVE_LICENSE'),
('a2577f3f-eed4-4eb7-81c2-b986987a9769', 'Vendeur1', 'Vendeur1', 'Vendeur@gmail.com', '50320122', NULL, '$2a$12$tsAcKfcu/ESe/HZrZ1Erm.BD.ddG82ZnAMaxZZQ9ty.2/77GWhfTW', '721550', '2024-09-18 23:00:00', 0, 'cus_Q3HfVqPfneldZx', 1, '2024-05-05 20:52:11.925799', '2024-05-08 14:51:52.275881', 'CUSTOMER', 'VERIFIED', 1, 1, 1, 0, 1, 1, 1, 'CHARITY', 'Arabic', NULL, 1, NULL, 'PENDING', 'Vendor', NULL, NULL, NULL, '8e0bcd66-fc28-11ee-80d8-5405dbedfa15', 'e822909a-fc29-11ee-80d8-5405dbedfa15', '9e5d5557-e0fc-4d18-af9e-320a4db1938d', '088358e6-9ea5-4e13-97d2-eab175ae3ee8', '04ed6a5b-62eb-40f4-9cc8-60ab7b15b65e', NULL, '123', '123', '123', 'aziz@gmail.fr', 'BIAT', '123456789', '12345678', 0, 0, 'test', '123', 'Aziz', 'Flah', '8e0bcd66-fc28-11ee-80d8-5405dbedfa15', NULL, 'PASSPORT '),
('b65b625e-88f8-40a9-8e26-6ebf50934a0d', 'iheb', 'ali', 'ihebos@gmail.com', '50320136', NULL, '$2b$08$4.nG1f/LcyILbop4PoBw7OiVWd.IyCKMIR4iP6Ia5RZldgS58jKCK', '323331', '2024-04-28 23:00:00', 0, 'cus_PwA4V5EwfF9oL1', 1, '2024-04-16 20:33:17.503364', '2024-04-16 20:55:51.000000', 'CUSTOMER', 'VERIFIED', 1, 1, 1, 0, 0, 1, 0, 'PRIVATE', 'English', NULL, 1, NULL, 'PENDING', 'Vendor', NULL, NULL, NULL, '8e0bcd66-fc28-11ee-80d8-5405dbedfa15', 'e822909a-fc29-11ee-80d8-5405dbedfa15', NULL, NULL, NULL, NULL, 'gabes', '11', 'gabes', '6000', NULL, NULL, NULL, 0, 0, 'testo', '12345', 'azdazd', 'azdazdaz', '8e0bcd66-fc28-11ee-80d8-5405dbedfa15', NULL, 'PASSPORT ');

-- --------------------------------------------------------

--
-- Table structure for table `user_notification`
--

CREATE TABLE `user_notification` (
  `id` varchar(36) NOT NULL,
  `isSeen` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` varchar(36) DEFAULT NULL,
  `notificationId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_notification`
--

INSERT INTO `user_notification` (`id`, `isSeen`, `createdAt`, `updatedAt`, `userId`, `notificationId`) VALUES
('0c1938f1-5e74-4459-8c72-ffc7634ca5d5', 0, '2024-05-08 15:03:44.078273', '2024-05-08 15:03:44.078273', 'a2577f3f-eed4-4eb7-81c2-b986987a9769', 'b541f88a-61e3-4208-9b60-251e8340648b'),
('2af124bd-e49a-4c7b-8acc-71153b154caa', 0, '2024-05-05 21:20:46.022800', '2024-05-05 21:20:46.022800', NULL, '79faef1d-6f58-42ef-b69d-9f9ca93427ad'),
('362bb6a4-58b6-4906-b535-9aa7aa153a53', 0, '2024-05-05 21:20:45.999145', '2024-05-05 21:20:45.999145', '6d8b776a-16da-4592-a4fc-44e887ae3ef4', '387c8b69-0fc1-4df1-b8a1-22318be92948'),
('45259a65-7082-4139-937b-56daecdfd70f', 0, '2024-04-16 20:33:18.366143', '2024-04-16 20:33:18.366143', 'b65b625e-88f8-40a9-8e26-6ebf50934a0d', 'e2d7a95b-9327-41c3-8331-a95b9b9b1e7b'),
('46e68a5a-7c43-4df2-8c9b-dff896edf3d5', 0, '2024-05-08 15:02:53.928453', '2024-05-08 15:02:53.928453', NULL, '03d007ba-20ce-4144-8e8a-768a6e344a4a'),
('534f79ab-5025-479e-ae40-afd0e12547de', 0, '2024-04-16 19:06:53.081186', '2024-04-16 19:06:53.081186', '44d246a2-9c9d-4e25-9a5f-7c872fbe7f8d', 'fe252608-b5b1-4b0e-a3c0-3ea714f21cd4'),
('81bda85b-311c-440c-bb7f-b9d013ba8b6c', 0, '2024-05-08 14:44:58.383057', '2024-05-08 14:44:58.383057', NULL, 'c3120e7e-4e50-49f8-9f4d-0c932f4fc060'),
('85bd28ed-8430-4658-a359-2a015a963585', 0, '2024-05-05 21:14:21.212211', '2024-05-05 21:14:21.212211', 'a2577f3f-eed4-4eb7-81c2-b986987a9769', '2eacd2c9-30a8-464a-b42c-e6b4082a1ac2'),
('9d94f0a9-a357-41e7-b403-856cb601292a', 0, '2024-05-05 20:58:52.236981', '2024-05-05 20:58:52.236981', 'a2577f3f-eed4-4eb7-81c2-b986987a9769', '5e6f7841-1b47-471c-b951-8f39d2d1afde'),
('a2024877-83bd-4698-bb16-096756cb302c', 0, '2024-05-05 20:52:38.022489', '2024-05-05 20:52:38.022489', 'a2577f3f-eed4-4eb7-81c2-b986987a9769', 'e666ab5e-efad-4e70-93d9-226bfd81520d'),
('a8984b93-9d58-4fc1-bc0c-06e63569edf9', 0, '2024-04-16 20:33:55.520337', '2024-04-16 20:33:55.520337', 'b65b625e-88f8-40a9-8e26-6ebf50934a0d', '376ae87b-91ce-402e-b310-0021c099bc09'),
('b15cafd6-4cfd-4da6-ba22-f9664663448a', 0, '2024-05-08 14:11:18.992717', '2024-05-08 14:11:18.992717', '6fdd6c0c-6153-4bd3-a875-18440dbcbcff', '4bf8793c-ae81-4ca0-b737-28180f9f735d'),
('b66c11a4-80c7-4b61-8893-e371b85ad2f7', 0, '2024-05-05 21:16:37.182147', '2024-05-05 21:16:37.182147', '6d8b776a-16da-4592-a4fc-44e887ae3ef4', '7a2af8bc-d9ce-43bb-a3de-7ada3c231f01'),
('bf8bdcbe-d2f7-414c-b984-48a05ac191ca', 0, '2024-05-08 14:44:58.381932', '2024-05-08 14:44:58.381932', '6d8b776a-16da-4592-a4fc-44e887ae3ef4', 'c9139841-c051-43ee-b26c-bbd9343634a2'),
('c71a1057-7cbd-488b-baff-c923383c31db', 0, '2024-05-05 21:13:25.966389', '2024-05-05 21:13:25.966389', NULL, 'f3cde391-fbc5-4420-ae9d-e61557561bb3');

-- --------------------------------------------------------

--
-- Table structure for table `user_subscription`
--

CREATE TABLE `user_subscription` (
  `id` varchar(36) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `vendorId` varchar(36) DEFAULT NULL,
  `subscriptionId` varchar(36) DEFAULT NULL,
  `paymentInfoId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_subscription`
--

INSERT INTO `user_subscription` (`id`, `startDate`, `endDate`, `isActive`, `createdAt`, `updatedAt`, `vendorId`, `subscriptionId`, `paymentInfoId`) VALUES
('340daf4e-2333-4b25-a39d-d48a2a6ea939', '2024-05-08 13:11:18', NULL, 1, '2024-05-08 14:11:18.978619', '2024-05-08 14:11:18.978619', '6fdd6c0c-6153-4bd3-a875-18440dbcbcff', '1bfe5a24-0b16-11ef-80c3-5405dbedfa15', NULL),
('a69ca38c-67c8-4ec2-81d0-e7aa71c71992', '2024-04-16 19:33:18', NULL, 1, '2024-04-16 20:33:18.351367', '2024-04-16 20:33:18.351367', 'b65b625e-88f8-40a9-8e26-6ebf50934a0d', NULL, NULL),
('c6fac274-063f-4561-a8de-993f55fc2ee9', '2024-05-05 19:52:37', NULL, 1, '2024-05-05 20:52:37.984936', '2024-05-05 20:52:37.984936', 'a2577f3f-eed4-4eb7-81c2-b986987a9769', '1bfe5a24-0b16-11ef-80c3-5405dbedfa15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `variation_theme`
--

CREATE TABLE `variation_theme` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variation_theme`
--

INSERT INTO `variation_theme` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('4c991603-fce9-4fe0-b45f-0d42de27d0f3', 'difference 1', '2024-04-16 19:12:39.006380', '2024-04-16 19:12:39.006380');

-- --------------------------------------------------------

--
-- Table structure for table `variation_theme_attributes_attribute`
--

CREATE TABLE `variation_theme_attributes_attribute` (
  `variationThemeId` varchar(36) NOT NULL,
  `attributeId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vat`
--

CREATE TABLE `vat` (
  `id` varchar(36) NOT NULL,
  `percentage` int(11) NOT NULL,
  `type` enum('TRANSACTION','TRANSPORT') NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vat`
--

INSERT INTO `vat` (`id`, `percentage`, `type`, `createdAt`, `updatedAt`) VALUES
('1bfd161f-0b16-11ef-80c3-5405dbedfa15', 10, 'TRANSACTION', '2024-05-05 20:31:45.853070', '2024-05-05 20:31:45.853070'),
('1bfd6a27-0b16-11ef-80c3-5405dbedfa15', 5, 'TRANSPORT', '2024-05-05 20:31:45.855215', '2024-05-05 20:31:45.855215');

-- --------------------------------------------------------

--
-- Table structure for table `wish_list`
--

CREATE TABLE `wish_list` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'default',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `clientId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ad`
--
ALTER TABLE `ad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_572e8bdde3fe369079541c2da2` (`kind`),
  ADD KEY `FK_2dcbd14e7ef0a7b9fc5c6db51b3` (`productId`),
  ADD KEY `FK_a7eb67aa63030172be1ea0a346c` (`vendorId`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_de87485f6489f5d0995f584195` (`email`),
  ADD UNIQUE KEY `IDX_605f773f0197434dd12ab65277` (`phone`),
  ADD KEY `FK_c43c1763a09603dfe1d90cc0641` (`managementPackId`);

--
-- Indexes for table `admin_notification`
--
ALTER TABLE `admin_notification`
  ADD PRIMARY KEY (`id`,`notificationId`),
  ADD KEY `FK_bf67c82fdfa82a9d608709224a0` (`notificationId`);

--
-- Indexes for table `adress`
--
ALTER TABLE `adress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a37483a9b9ded5160440d731366` (`stateId`),
  ADD KEY `FK_2478a7518eb6dbff9e28dbcc277` (`clientId`);

--
-- Indexes for table `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attribute_choice`
--
ALTER TABLE `attribute_choice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_eda3f04abd42fc740c60cef88e0` (`attributeId`);

--
-- Indexes for table `attribute_value`
--
ALTER TABLE `attribute_value`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_123ac30d8ade936347e4099cc4a` (`attributeId`),
  ADD KEY `FK_45f5265d172ea468a81ec22ac85` (`simpleProductId`),
  ADD KEY `FK_4b534c992b5c95f09808fd146dd` (`parentListingId`),
  ADD KEY `FK_e734ab66182b93b5b2ff7484e40` (`variationId`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_6a6cc2453a0675d3e2cad3070c` (`imageId`),
  ADD KEY `IDX_0bf43d7e200e5e1c63a6fc55ad` (`kind`),
  ADD KEY `FK_3f28406555f9d571a72ba3a2583` (`simpleProductId`),
  ADD KEY `FK_673c10eca089af64032e1ca966a` (`parentListingId`),
  ADD KEY `FK_39d645a28c7aad94c227f4ba22f` (`departmentId`),
  ADD KEY `FK_3d711b49338fb6396c34d80332f` (`vendorId`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_5f468ae5696f07da025138e38f` (`name`),
  ADD UNIQUE KEY `REL_062524ac7f03786e461134ea62` (`imageId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_4355dbbef8931576d9e362d4ae` (`clientId`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_29e590514f9941296f3a2440d39` (`cartId`),
  ADD KEY `FK_75db0de134fe0f9fe9e4591b7bf` (`productId`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_539be4e9dea780eef185ccef9e` (`imageId`),
  ADD UNIQUE KEY `REL_812a5881ca961fec70af4b8bce` (`videoId`),
  ADD KEY `IDX_367ab61416c0268313aa3bd172` (`kind`),
  ADD KEY `FK_4e1e327cfd87a3c5b501ae92049` (`userSendId`),
  ADD KEY `FK_8e34a678b50cfd63f476fafc9ff` (`userReceiverId`);

--
-- Indexes for table `child_category`
--
ALTER TABLE `child_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `child_category_attributes_attribute`
--
ALTER TABLE `child_category_attributes_attribute`
  ADD PRIMARY KEY (`childCategoryId`,`attributeId`),
  ADD KEY `IDX_a0cae86387e6fa85fae6edaf9a` (`childCategoryId`),
  ADD KEY `IDX_b8de095c051786e7b5adcbb070` (`attributeId`);

--
-- Indexes for table `child_category_parent_categories_parent_category`
--
ALTER TABLE `child_category_parent_categories_parent_category`
  ADD PRIMARY KEY (`childCategoryId`,`parentCategoryId`),
  ADD KEY `IDX_4e015c023b6cb3229daf9b68de` (`childCategoryId`),
  ADD KEY `IDX_08d8689eb27de2e19451567b97` (`parentCategoryId`);

--
-- Indexes for table `child_category_variation_themes_variation_theme`
--
ALTER TABLE `child_category_variation_themes_variation_theme`
  ADD PRIMARY KEY (`childCategoryId`,`variationThemeId`),
  ADD KEY `IDX_43586ebba6615668d111b65005` (`childCategoryId`),
  ADD KEY `IDX_9228b2f8799ef0766fb4b606fe` (`variationThemeId`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deal_product`
--
ALTER TABLE `deal_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_98fb00184836d07acf6800f0167` (`productId`),
  ADD KEY `FK_57a28f48ef6ca650bce402b6a55` (`dealId`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_89afb90e5a3b2a50013d3dee27` (`imageId`);

--
-- Indexes for table `featured_department`
--
ALTER TABLE `featured_department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_e348f567a88a645f97f8d03c4d` (`departmentId`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d7187ebff85831dd00deaa3e0cc` (`createdById`),
  ADD KEY `FK_8fbe08bb7a109d8ef00a65edf71` (`simpleproductId`),
  ADD KEY `FK_46253eba9028891db505a4f3b07` (`transporterDocumentId`),
  ADD KEY `FK_265ae47de75edac6e1596bc4f34` (`parentlistingId`);

--
-- Indexes for table `gain`
--
ALTER TABLE `gain`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gain_history`
--
ALTER TABLE `gain_history`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_eebfe85393054316342c3b02ad` (`paymentId`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7ba97be2e5abeec15559a14e85` (`kind`),
  ADD KEY `FK_82a25a3a3cca8f81d3ee504950e` (`clientId`),
  ADD KEY `FK_3c75ec949981f7cbf72a128291d` (`simpleProductId`),
  ADD KEY `FK_5d95884157d8fb0457f7b38166f` (`parentListingId`);

--
-- Indexes for table `idea_list`
--
ALTER TABLE `idea_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d8e2b5ed4eb7efe73ad61e1b294` (`clientId`);

--
-- Indexes for table `idea_list_products_product`
--
ALTER TABLE `idea_list_products_product`
  ADD PRIMARY KEY (`ideaListId`,`productId`),
  ADD KEY `IDX_79319249bd09e36058d686001e` (`ideaListId`),
  ADD KEY `IDX_1982d27b5c1ae47c8112d14a64` (`productId`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_bcd83d98aa78605fbe18d0eda0` (`orderId`),
  ADD KEY `FK_c4c0b4dfeb15168f5a82c7549a1` (`vendorId`);

--
-- Indexes for table `management_pack`
--
ALTER TABLE `management_pack`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_5837460bdce7f25231e4fe0ec0` (`name`);

--
-- Indexes for table `management_pack_permissions_permission`
--
ALTER TABLE `management_pack_permissions_permission`
  ADD PRIMARY KEY (`managementPackId`,`permissionId`),
  ADD KEY `IDX_e67b503ef870075100f572e64b` (`managementPackId`),
  ADD KEY `IDX_e84b523fcb401ae81fd17bb8f9` (`permissionId`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_bb700635d1a1612689d492a741` (`imageId`),
  ADD UNIQUE KEY `REL_973cfa9f35b2f8a98b4bbbe440` (`videoId`),
  ADD KEY `FK_446251f8ceb2132af01b68eb593` (`userId`),
  ADD KEY `FK_8f2426b56103f39a64bdda47dde` (`adminId`),
  ADD KEY `FK_ffa5ea5d588475ed3a175a39887` (`reportId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_54328c21953d4b77163e1ca4e4` (`kind`),
  ADD KEY `FK_158290aea1aeac94f43ff5ac34b` (`orderId`),
  ADD KEY `FK_1e2f844c52faf3aa4e3008976ae` (`productId`),
  ADD KEY `FK_bac6339b4911a61bd74d64f8a0b` (`reportId`),
  ADD KEY `FK_61393b12359bf4221ab9e6ab20d` (`productReviewId`),
  ADD KEY `FK_1ced25315eb974b73391fb1c81b` (`userId`),
  ADD KEY `FK_6465018ca439b4aa55c1e476c95` (`payoutId`),
  ADD KEY `FK_e91214108d91d7b78619f4d7925` (`chatId`),
  ADD KEY `FK_3e4252e18b5cf81db5aed762149` (`incomeId`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4c9afbcce502a9ae7859b4f7ba4` (`assignedTransporterId`),
  ADD KEY `FK_9b27855a9c2ade186e5c55d1ec3` (`clientId`),
  ADD KEY `FK_ac1293b8024ff05e963d82df453` (`vendorId`),
  ADD KEY `FK_55bbf0b58a4a578d79a31d35a37` (`vendorStateId`),
  ADD KEY `FK_d0c9107e80f91fde1523efb96e1` (`paymentInfoId`),
  ADD KEY `FK_0ad14dab0e6993eed0657636eb2` (`shippingInfoId`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_904370c093ceea4369659a3c810` (`productId`),
  ADD KEY `FK_1c6660a369acdc9985d15250b84` (`dealProductId`),
  ADD KEY `FK_646bf9ece6f45dbe41c203e06e0` (`orderId`);

--
-- Indexes for table `parent_category`
--
ALTER TABLE `parent_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_20d4dd2056a43adf8212a7f433` (`imageId`);

--
-- Indexes for table `parent_category_departments_department`
--
ALTER TABLE `parent_category_departments_department`
  ADD PRIMARY KEY (`parentCategoryId`,`departmentId`),
  ADD KEY `IDX_47e4ef858584c3b0d1fa99a52c` (`parentCategoryId`),
  ADD KEY `IDX_6eec7909644525a4cb10767d45` (`departmentId`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_4573a80194690fc622593e226f` (`kind`),
  ADD KEY `FK_cc02708466dbeff6aead2aa1de0` (`clientId`);

--
-- Indexes for table `payment_platform`
--
ALTER TABLE `payment_platform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payout`
--
ALTER TABLE `payout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_900903f5464be96f8ecbe96b721` (`createdById`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_management_packs_management_pack`
--
ALTER TABLE `permission_management_packs_management_pack`
  ADD PRIMARY KEY (`permissionId`,`managementPackId`),
  ADD KEY `IDX_7a457efbda95edf6e357bf90b1` (`permissionId`),
  ADD KEY `IDX_f12de4bf72b4de13ebd6a70a94` (`managementPackId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_805ff007da153f6190118bfe1b` (`kind`),
  ADD KEY `FK_8a4ee7200fccba2f488cddbb475` (`childCategoryId`),
  ADD KEY `FK_2e468f9a9d98f48fc290e898439` (`customBrandId`),
  ADD KEY `FK_a062fad3b512bd74643beea6d4e` (`clientsId`),
  ADD KEY `FK_921582066aa70b502e78ea92012` (`vendorId`),
  ADD KEY `FK_bd45e22f3c5247bfa4b9ad8ebf7` (`primaryImageId`),
  ADD KEY `FK_f4084bc1955e5bf13acbac43b1c` (`parentListingId`),
  ADD KEY `FK_45f32879bf8b0d47945c0658921` (`variationThemeId`);

--
-- Indexes for table `product_attribute_choices_attribute_choice`
--
ALTER TABLE `product_attribute_choices_attribute_choice`
  ADD PRIMARY KEY (`productId`,`attributeChoiceId`),
  ADD KEY `IDX_0d86e1efa386f8ef3aeee75722` (`productId`),
  ADD KEY `IDX_01783eeb5ff40624f8ba6fb790` (`attributeChoiceId`);

--
-- Indexes for table `product_coupons_promotinal_offer`
--
ALTER TABLE `product_coupons_promotinal_offer`
  ADD PRIMARY KEY (`productId`,`promotinalOfferId`),
  ADD KEY `IDX_9dcd6013f8a0dcd822aef7e8af` (`productId`),
  ADD KEY `IDX_0aae03b54bb1cb520fc215769d` (`promotinalOfferId`);

--
-- Indexes for table `product_feature`
--
ALTER TABLE `product_feature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f34a34873ce72b9609a68012f5d` (`simpleProductId`),
  ADD KEY `FK_71fca246d78c73d3d4394d449ec` (`parentListingId`);

--
-- Indexes for table `product_key_word`
--
ALTER TABLE `product_key_word`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b24638f1aa43f8e4aa22102daf6` (`simpleProductId`),
  ADD KEY `FK_4a72c5809cc933a1c4a05d08489` (`parentListingId`);

--
-- Indexes for table `product_promotions_promotinal_offer`
--
ALTER TABLE `product_promotions_promotinal_offer`
  ADD PRIMARY KEY (`productId`,`promotinalOfferId`),
  ADD KEY `IDX_006afe44c416a2b313bb9af788` (`productId`),
  ADD KEY `IDX_c8582bf6eb7e23c3a07b64c6cb` (`promotinalOfferId`);

--
-- Indexes for table `product_registry_details`
--
ALTER TABLE `product_registry_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_211ba47a3d6cc3d1d0c4fdf5b5b` (`productId`),
  ADD KEY `FK_8ca1f11bab88c215808b764746b` (`registryId`);

--
-- Indexes for table `product_review`
--
ALTER TABLE `product_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_fca8f24a4ebe5e411906e2ac940` (`clientId`),
  ADD KEY `FK_06e7335708b5e7870f1eaa608d2` (`productId`);

--
-- Indexes for table `product_variation_attribute_choices_attribute_choice`
--
ALTER TABLE `product_variation_attribute_choices_attribute_choice`
  ADD PRIMARY KEY (`productId`,`attributeChoiceId`),
  ADD KEY `IDX_f847f7f9847859bdb1f747c432` (`productId`),
  ADD KEY `IDX_4ecefca97677acc03a25e961e7` (`attributeChoiceId`);

--
-- Indexes for table `product_warning`
--
ALTER TABLE `product_warning`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_987521ea8d4fdd62d819af5ec79` (`simpleProductId`),
  ADD KEY `FK_372ca17820a693695e64c01370c` (`parentListingId`);

--
-- Indexes for table `product_wish_details`
--
ALTER TABLE `product_wish_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_76d0ae4ecc5c8b9ce3ce1c723bf` (`productId`),
  ADD KEY `FK_352abf6ce27fe44a3d54ea5e800` (`wishListId`);

--
-- Indexes for table `promotinal_offer`
--
ALTER TABLE `promotinal_offer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_79e9b3a73882df325642f6d6b4` (`kind`),
  ADD KEY `FK_cc8290bc932f7b372cc099945d2` (`vendorId`),
  ADD KEY `FK_141fff7257df32a626faf96afbc` (`clientId`);

--
-- Indexes for table `promotinal_offer_applies_to_product`
--
ALTER TABLE `promotinal_offer_applies_to_product`
  ADD PRIMARY KEY (`promotinalOfferId`,`productId`),
  ADD KEY `IDX_8a62eb97a428ba03b0ed13c441` (`promotinalOfferId`),
  ADD KEY `IDX_6e07458b99944b431e692d322a` (`productId`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_79dfad98ad1c0a4daae66d59bf4` (`productId`),
  ADD KEY `FK_87df6afba485965b2d3cab7c6f7` (`clientId`);

--
-- Indexes for table `registry`
--
ALTER TABLE `registry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_2ac03fff03460586f5befb42b5` (`kind`),
  ADD KEY `FK_0272769c8f4495af53e920d793f` (`clientsId`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_b7ab480d27c4e7f614b956f492` (`orderId`),
  ADD KEY `IDX_cc814b53b389303c8c61147515` (`kind`),
  ADD KEY `FK_93db13e75c8c42716cd05e498bc` (`createdById`),
  ADD KEY `FK_c5f1facedc3102606aeae0e7c09` (`assignedAdminId`);

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_dfd952a4d26cf661248efec5f37` (`questionId`),
  ADD KEY `FK_ee219c126900a530afa70b6d640` (`usersId`);

--
-- Indexes for table `saved_items`
--
ALTER TABLE `saved_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved_items_products_product`
--
ALTER TABLE `saved_items_products_product`
  ADD PRIMARY KEY (`savedItemsId`,`productId`),
  ADD KEY `IDX_b207d244bb28dd9120ac19320c` (`savedItemsId`),
  ADD KEY `IDX_71ee16112f06414fbd6ac4df15` (`productId`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_add1061c5e74e26e8a56e2e0831` (`stateId`);

--
-- Indexes for table `shipping_cost`
--
ALTER TABLE `shipping_cost`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specification`
--
ALTER TABLE `specification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_00b899b03f10760439d95c4bd26` (`simpleProductId`),
  ADD KEY `FK_4061897d62bdde3e1a4e4c95ab1` (`parentListingId`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e81c86ceadca8731f5fca8e06f5` (`countryId`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tier_promotions`
--
ALTER TABLE `tier_promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_db09683c02cb5d0eec7cd7587f0` (`promotionId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  ADD UNIQUE KEY `IDX_a000cca60bcf04454e72769949` (`phone`),
  ADD UNIQUE KEY `REL_e54aa81ab713bad5c55fae85dd` (`accountGiftCardId`),
  ADD UNIQUE KEY `REL_0fec14ba475505ecbfc63e5a3c` (`savedItemsId`),
  ADD KEY `FK_9e9662808426cca2f97d6526c58` (`productsId`),
  ADD KEY `FK_fb80ddd6260e6e4ee4f32016cb8` (`businessCountryId`),
  ADD KEY `FK_9c4a84a826e5f97340989c09768` (`businessStateId`),
  ADD KEY `FK_47ea9e46db045b9f18969a85351` (`identityFrontId`),
  ADD KEY `FK_cd87fdc54599b7deedfd838d0d3` (`identityBackId`),
  ADD KEY `FK_27b95d3e1caef389b1e6f5628d0` (`statementDocumentId`),
  ADD KEY `FK_99e09ed02abcb53c2a24f014982` (`driveLicenceId`);

--
-- Indexes for table `user_notification`
--
ALTER TABLE `user_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_dce2a8927967051c447ae10bc8b` (`userId`),
  ADD KEY `FK_680af16b67e94e2cb693b9e9033` (`notificationId`);

--
-- Indexes for table `user_subscription`
--
ALTER TABLE `user_subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_feec8b9243e3d532e6d307138b` (`paymentInfoId`),
  ADD KEY `FK_174c71d46e702060b5aa3183f42` (`vendorId`),
  ADD KEY `FK_a7575d9d46b42a9d7f275be1ec4` (`subscriptionId`);

--
-- Indexes for table `variation_theme`
--
ALTER TABLE `variation_theme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variation_theme_attributes_attribute`
--
ALTER TABLE `variation_theme_attributes_attribute`
  ADD PRIMARY KEY (`variationThemeId`,`attributeId`),
  ADD KEY `IDX_0e881840553cad68da3859ab1a` (`variationThemeId`),
  ADD KEY `IDX_2cf0962ae41ce715d355f37c92` (`attributeId`);

--
-- Indexes for table `vat`
--
ALTER TABLE `vat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wish_list`
--
ALTER TABLE `wish_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1a8aa7ea9efa02267394d073573` (`clientId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ad`
--
ALTER TABLE `ad`
  ADD CONSTRAINT `FK_2dcbd14e7ef0a7b9fc5c6db51b3` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a7eb67aa63030172be1ea0a346c` FOREIGN KEY (`vendorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FK_c43c1763a09603dfe1d90cc0641` FOREIGN KEY (`managementPackId`) REFERENCES `management_pack` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `admin_notification`
--
ALTER TABLE `admin_notification`
  ADD CONSTRAINT `FK_bf67c82fdfa82a9d608709224a0` FOREIGN KEY (`notificationId`) REFERENCES `notification` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `adress`
--
ALTER TABLE `adress`
  ADD CONSTRAINT `FK_2478a7518eb6dbff9e28dbcc277` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a37483a9b9ded5160440d731366` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `attribute_choice`
--
ALTER TABLE `attribute_choice`
  ADD CONSTRAINT `FK_eda3f04abd42fc740c60cef88e0` FOREIGN KEY (`attributeId`) REFERENCES `attribute` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `attribute_value`
--
ALTER TABLE `attribute_value`
  ADD CONSTRAINT `FK_123ac30d8ade936347e4099cc4a` FOREIGN KEY (`attributeId`) REFERENCES `attribute` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_45f5265d172ea468a81ec22ac85` FOREIGN KEY (`simpleProductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4b534c992b5c95f09808fd146dd` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e734ab66182b93b5b2ff7484e40` FOREIGN KEY (`variationId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `banner`
--
ALTER TABLE `banner`
  ADD CONSTRAINT `FK_39d645a28c7aad94c227f4ba22f` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3d711b49338fb6396c34d80332f` FOREIGN KEY (`vendorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3f28406555f9d571a72ba3a2583` FOREIGN KEY (`simpleProductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_673c10eca089af64032e1ca966a` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6a6cc2453a0675d3e2cad3070c0` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `FK_062524ac7f03786e461134ea624` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_4355dbbef8931576d9e362d4ae1` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `FK_29e590514f9941296f3a2440d39` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_75db0de134fe0f9fe9e4591b7bf` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FK_4e1e327cfd87a3c5b501ae92049` FOREIGN KEY (`userSendId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_539be4e9dea780eef185ccef9e9` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_812a5881ca961fec70af4b8bce1` FOREIGN KEY (`videoId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8e34a678b50cfd63f476fafc9ff` FOREIGN KEY (`userReceiverId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `child_category_attributes_attribute`
--
ALTER TABLE `child_category_attributes_attribute`
  ADD CONSTRAINT `FK_a0cae86387e6fa85fae6edaf9aa` FOREIGN KEY (`childCategoryId`) REFERENCES `child_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_b8de095c051786e7b5adcbb0701` FOREIGN KEY (`attributeId`) REFERENCES `attribute` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `child_category_parent_categories_parent_category`
--
ALTER TABLE `child_category_parent_categories_parent_category`
  ADD CONSTRAINT `FK_08d8689eb27de2e19451567b97a` FOREIGN KEY (`parentCategoryId`) REFERENCES `parent_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4e015c023b6cb3229daf9b68de9` FOREIGN KEY (`childCategoryId`) REFERENCES `child_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `child_category_variation_themes_variation_theme`
--
ALTER TABLE `child_category_variation_themes_variation_theme`
  ADD CONSTRAINT `FK_43586ebba6615668d111b65005a` FOREIGN KEY (`childCategoryId`) REFERENCES `child_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_9228b2f8799ef0766fb4b606fe1` FOREIGN KEY (`variationThemeId`) REFERENCES `variation_theme` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `deal_product`
--
ALTER TABLE `deal_product`
  ADD CONSTRAINT `FK_57a28f48ef6ca650bce402b6a55` FOREIGN KEY (`dealId`) REFERENCES `promotinal_offer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_98fb00184836d07acf6800f0167` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `FK_89afb90e5a3b2a50013d3dee270` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `featured_department`
--
ALTER TABLE `featured_department`
  ADD CONSTRAINT `FK_e348f567a88a645f97f8d03c4d3` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `FK_265ae47de75edac6e1596bc4f34` FOREIGN KEY (`parentlistingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_46253eba9028891db505a4f3b07` FOREIGN KEY (`transporterDocumentId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8fbe08bb7a109d8ef00a65edf71` FOREIGN KEY (`simpleproductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d7187ebff85831dd00deaa3e0cc` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `gain_history`
--
ALTER TABLE `gain_history`
  ADD CONSTRAINT `FK_eebfe85393054316342c3b02ad2` FOREIGN KEY (`paymentId`) REFERENCES `payment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK_3c75ec949981f7cbf72a128291d` FOREIGN KEY (`simpleProductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5d95884157d8fb0457f7b38166f` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_82a25a3a3cca8f81d3ee504950e` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `idea_list`
--
ALTER TABLE `idea_list`
  ADD CONSTRAINT `FK_d8e2b5ed4eb7efe73ad61e1b294` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `idea_list_products_product`
--
ALTER TABLE `idea_list_products_product`
  ADD CONSTRAINT `FK_1982d27b5c1ae47c8112d14a646` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_79319249bd09e36058d686001e7` FOREIGN KEY (`ideaListId`) REFERENCES `idea_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `FK_bcd83d98aa78605fbe18d0eda00` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c4c0b4dfeb15168f5a82c7549a1` FOREIGN KEY (`vendorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `management_pack_permissions_permission`
--
ALTER TABLE `management_pack_permissions_permission`
  ADD CONSTRAINT `FK_e67b503ef870075100f572e64bb` FOREIGN KEY (`managementPackId`) REFERENCES `management_pack` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_e84b523fcb401ae81fd17bb8f90` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK_446251f8ceb2132af01b68eb593` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8f2426b56103f39a64bdda47dde` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_973cfa9f35b2f8a98b4bbbe4407` FOREIGN KEY (`videoId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bb700635d1a1612689d492a7411` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ffa5ea5d588475ed3a175a39887` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FK_158290aea1aeac94f43ff5ac34b` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_1ced25315eb974b73391fb1c81b` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_1e2f844c52faf3aa4e3008976ae` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3e4252e18b5cf81db5aed762149` FOREIGN KEY (`incomeId`) REFERENCES `income` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_61393b12359bf4221ab9e6ab20d` FOREIGN KEY (`productReviewId`) REFERENCES `product_review` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6465018ca439b4aa55c1e476c95` FOREIGN KEY (`payoutId`) REFERENCES `payout` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bac6339b4911a61bd74d64f8a0b` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e91214108d91d7b78619f4d7925` FOREIGN KEY (`chatId`) REFERENCES `chat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_0ad14dab0e6993eed0657636eb2` FOREIGN KEY (`shippingInfoId`) REFERENCES `shipping` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4c9afbcce502a9ae7859b4f7ba4` FOREIGN KEY (`assignedTransporterId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_55bbf0b58a4a578d79a31d35a37` FOREIGN KEY (`vendorStateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9b27855a9c2ade186e5c55d1ec3` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ac1293b8024ff05e963d82df453` FOREIGN KEY (`vendorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d0c9107e80f91fde1523efb96e1` FOREIGN KEY (`paymentInfoId`) REFERENCES `payment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `FK_1c6660a369acdc9985d15250b84` FOREIGN KEY (`dealProductId`) REFERENCES `deal_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `parent_category`
--
ALTER TABLE `parent_category`
  ADD CONSTRAINT `FK_20d4dd2056a43adf8212a7f433f` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `parent_category_departments_department`
--
ALTER TABLE `parent_category_departments_department`
  ADD CONSTRAINT `FK_47e4ef858584c3b0d1fa99a52c4` FOREIGN KEY (`parentCategoryId`) REFERENCES `parent_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_6eec7909644525a4cb10767d452` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD CONSTRAINT `FK_cc02708466dbeff6aead2aa1de0` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `payout`
--
ALTER TABLE `payout`
  ADD CONSTRAINT `FK_900903f5464be96f8ecbe96b721` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `permission_management_packs_management_pack`
--
ALTER TABLE `permission_management_packs_management_pack`
  ADD CONSTRAINT `FK_7a457efbda95edf6e357bf90b1d` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f12de4bf72b4de13ebd6a70a94c` FOREIGN KEY (`managementPackId`) REFERENCES `management_pack` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_2e468f9a9d98f48fc290e898439` FOREIGN KEY (`customBrandId`) REFERENCES `brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_45f32879bf8b0d47945c0658921` FOREIGN KEY (`variationThemeId`) REFERENCES `variation_theme` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8a4ee7200fccba2f488cddbb475` FOREIGN KEY (`childCategoryId`) REFERENCES `child_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_921582066aa70b502e78ea92012` FOREIGN KEY (`vendorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a062fad3b512bd74643beea6d4e` FOREIGN KEY (`clientsId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bd45e22f3c5247bfa4b9ad8ebf7` FOREIGN KEY (`primaryImageId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f4084bc1955e5bf13acbac43b1c` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_attribute_choices_attribute_choice`
--
ALTER TABLE `product_attribute_choices_attribute_choice`
  ADD CONSTRAINT `FK_01783eeb5ff40624f8ba6fb7908` FOREIGN KEY (`attributeChoiceId`) REFERENCES `attribute_choice` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_0d86e1efa386f8ef3aeee75722b` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_coupons_promotinal_offer`
--
ALTER TABLE `product_coupons_promotinal_offer`
  ADD CONSTRAINT `FK_0aae03b54bb1cb520fc215769d8` FOREIGN KEY (`promotinalOfferId`) REFERENCES `promotinal_offer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9dcd6013f8a0dcd822aef7e8afc` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_feature`
--
ALTER TABLE `product_feature`
  ADD CONSTRAINT `FK_71fca246d78c73d3d4394d449ec` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f34a34873ce72b9609a68012f5d` FOREIGN KEY (`simpleProductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_key_word`
--
ALTER TABLE `product_key_word`
  ADD CONSTRAINT `FK_4a72c5809cc933a1c4a05d08489` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b24638f1aa43f8e4aa22102daf6` FOREIGN KEY (`simpleProductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_promotions_promotinal_offer`
--
ALTER TABLE `product_promotions_promotinal_offer`
  ADD CONSTRAINT `FK_006afe44c416a2b313bb9af7884` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_c8582bf6eb7e23c3a07b64c6cbf` FOREIGN KEY (`promotinalOfferId`) REFERENCES `promotinal_offer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_registry_details`
--
ALTER TABLE `product_registry_details`
  ADD CONSTRAINT `FK_211ba47a3d6cc3d1d0c4fdf5b5b` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8ca1f11bab88c215808b764746b` FOREIGN KEY (`registryId`) REFERENCES `registry` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_review`
--
ALTER TABLE `product_review`
  ADD CONSTRAINT `FK_06e7335708b5e7870f1eaa608d2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fca8f24a4ebe5e411906e2ac940` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_variation_attribute_choices_attribute_choice`
--
ALTER TABLE `product_variation_attribute_choices_attribute_choice`
  ADD CONSTRAINT `FK_4ecefca97677acc03a25e961e70` FOREIGN KEY (`attributeChoiceId`) REFERENCES `attribute_choice` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f847f7f9847859bdb1f747c432e` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_warning`
--
ALTER TABLE `product_warning`
  ADD CONSTRAINT `FK_372ca17820a693695e64c01370c` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_987521ea8d4fdd62d819af5ec79` FOREIGN KEY (`simpleProductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_wish_details`
--
ALTER TABLE `product_wish_details`
  ADD CONSTRAINT `FK_352abf6ce27fe44a3d54ea5e800` FOREIGN KEY (`wishListId`) REFERENCES `wish_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_76d0ae4ecc5c8b9ce3ce1c723bf` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `promotinal_offer`
--
ALTER TABLE `promotinal_offer`
  ADD CONSTRAINT `FK_141fff7257df32a626faf96afbc` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_cc8290bc932f7b372cc099945d2` FOREIGN KEY (`vendorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `promotinal_offer_applies_to_product`
--
ALTER TABLE `promotinal_offer_applies_to_product`
  ADD CONSTRAINT `FK_6e07458b99944b431e692d322ab` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_8a62eb97a428ba03b0ed13c441c` FOREIGN KEY (`promotinalOfferId`) REFERENCES `promotinal_offer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FK_79dfad98ad1c0a4daae66d59bf4` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_87df6afba485965b2d3cab7c6f7` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `registry`
--
ALTER TABLE `registry`
  ADD CONSTRAINT `FK_0272769c8f4495af53e920d793f` FOREIGN KEY (`clientsId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `FK_93db13e75c8c42716cd05e498bc` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b7ab480d27c4e7f614b956f4926` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c5f1facedc3102606aeae0e7c09` FOREIGN KEY (`assignedAdminId`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `FK_dfd952a4d26cf661248efec5f37` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ee219c126900a530afa70b6d640` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `saved_items_products_product`
--
ALTER TABLE `saved_items_products_product`
  ADD CONSTRAINT `FK_71ee16112f06414fbd6ac4df154` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b207d244bb28dd9120ac19320c2` FOREIGN KEY (`savedItemsId`) REFERENCES `saved_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipping`
--
ALTER TABLE `shipping`
  ADD CONSTRAINT `FK_add1061c5e74e26e8a56e2e0831` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `specification`
--
ALTER TABLE `specification`
  ADD CONSTRAINT `FK_00b899b03f10760439d95c4bd26` FOREIGN KEY (`simpleProductId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4061897d62bdde3e1a4e4c95ab1` FOREIGN KEY (`parentListingId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `state`
--
ALTER TABLE `state`
  ADD CONSTRAINT `FK_e81c86ceadca8731f5fca8e06f5` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tier_promotions`
--
ALTER TABLE `tier_promotions`
  ADD CONSTRAINT `FK_db09683c02cb5d0eec7cd7587f0` FOREIGN KEY (`promotionId`) REFERENCES `promotinal_offer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_0fec14ba475505ecbfc63e5a3c5` FOREIGN KEY (`savedItemsId`) REFERENCES `saved_items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_27b95d3e1caef389b1e6f5628d0` FOREIGN KEY (`statementDocumentId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_47ea9e46db045b9f18969a85351` FOREIGN KEY (`identityFrontId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_99e09ed02abcb53c2a24f014982` FOREIGN KEY (`driveLicenceId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9c4a84a826e5f97340989c09768` FOREIGN KEY (`businessStateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9e9662808426cca2f97d6526c58` FOREIGN KEY (`productsId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_cd87fdc54599b7deedfd838d0d3` FOREIGN KEY (`identityBackId`) REFERENCES `file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e54aa81ab713bad5c55fae85dd8` FOREIGN KEY (`accountGiftCardId`) REFERENCES `payment_method` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fb80ddd6260e6e4ee4f32016cb8` FOREIGN KEY (`businessCountryId`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_notification`
--
ALTER TABLE `user_notification`
  ADD CONSTRAINT `FK_680af16b67e94e2cb693b9e9033` FOREIGN KEY (`notificationId`) REFERENCES `notification` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_dce2a8927967051c447ae10bc8b` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_subscription`
--
ALTER TABLE `user_subscription`
  ADD CONSTRAINT `FK_174c71d46e702060b5aa3183f42` FOREIGN KEY (`vendorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a7575d9d46b42a9d7f275be1ec4` FOREIGN KEY (`subscriptionId`) REFERENCES `subscription` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_feec8b9243e3d532e6d307138be` FOREIGN KEY (`paymentInfoId`) REFERENCES `payment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `variation_theme_attributes_attribute`
--
ALTER TABLE `variation_theme_attributes_attribute`
  ADD CONSTRAINT `FK_0e881840553cad68da3859ab1a5` FOREIGN KEY (`variationThemeId`) REFERENCES `variation_theme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_2cf0962ae41ce715d355f37c92a` FOREIGN KEY (`attributeId`) REFERENCES `attribute` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wish_list`
--
ALTER TABLE `wish_list`
  ADD CONSTRAINT `FK_1a8aa7ea9efa02267394d073573` FOREIGN KEY (`clientId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
