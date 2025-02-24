-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2025 at 08:33 PM
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
-- Database: `ecommerce_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kid\'s', 1, '2025-02-22 08:45:35', '2025-02-22 08:45:35');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kid\'s', 0, '2025-02-22 08:45:15', '2025-02-22 08:45:15');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(16, '0001_01_01_000000_create_users_table', 1),
(17, '0001_01_01_000001_create_cache_table', 1),
(18, '0001_01_01_000002_create_jobs_table', 1),
(19, '2025_02_04_185100_create_personal_access_tokens_table', 1),
(20, '2025_02_05_175743_create_categories_table', 1),
(21, '2025_02_05_175824_create_brands_table', 1),
(22, '2025_02_22_100627_create_products_table', 1),
(23, '2025_02_22_122217_create_sizes_table', 1),
(24, '2025_02_22_122410_create_product_images_table', 1),
(25, '2025_02_22_122552_create_product_sizes_table', 1),
(26, '2025_02_22_122744_create_temp_images_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'token', 'df1523cbd554579be9bfd7dba1f8139b2c3cc1e4e4f27ee2c4e3d189e4bdfe4c', '[\"*\"]', NULL, NULL, '2025-02-22 08:44:01', '2025-02-22 08:44:01'),
(2, 'App\\Models\\User', 1, 'token', '76d3974dbb6e261973da42b4b11bf5ca776c4968e0fbfe12647f41091d546c49', '[\"*\"]', NULL, NULL, '2025-02-22 08:44:04', '2025-02-22 08:44:04'),
(3, 'App\\Models\\User', 1, 'token', 'efecd751b83e68dd3ca88358dea9d4d30fe7df1b9ba7d3c9fd0bedac5e53150e', '[\"*\"]', '2025-02-24 08:21:56', NULL, '2025-02-22 08:44:08', '2025-02-24 08:21:56'),
(4, 'App\\Models\\User', 1, 'token', '8fdd0c0ea79f4297b633291d94d89e8a16f85f0ce11bb046d64998d5c8472737', '[\"*\"]', NULL, NULL, '2025-02-22 10:41:48', '2025-02-22 10:41:48'),
(5, 'App\\Models\\User', 1, 'token', '8120ec37f11fa875227c1e8ab5437a1aec117ab68fbaec5d764fe2335beccf3b', '[\"*\"]', NULL, NULL, '2025-02-22 10:41:50', '2025-02-22 10:41:50'),
(6, 'App\\Models\\User', 1, 'token', '627b64c9fc667b2938339ede49c33ec509d991bcf698038021ecf36d369b0a0a', '[\"*\"]', '2025-02-22 10:42:01', NULL, '2025-02-22 10:41:55', '2025-02-22 10:42:01'),
(7, 'App\\Models\\User', 1, 'token', '9613bd50fd66d3de31e40c226774694f53574f6ae44a457ad0b9ae43f97a6dd7', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:05', '2025-02-22 10:54:05'),
(8, 'App\\Models\\User', 1, 'token', '69516d5fe806d63be647c114e2d92696164ea56be49d1f4680b70ef8ab6437b9', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:17', '2025-02-22 10:54:17'),
(9, 'App\\Models\\User', 1, 'token', '3fc32b372c56e859a154cafa3b2c232660d660f8a441b15491a6de3ab1d837ff', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:26', '2025-02-22 10:54:26'),
(10, 'App\\Models\\User', 1, 'token', 'ffebc67daa17c4990c9226cbdf302043755ef90749d6c77547c80642c992aa3d', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:39', '2025-02-22 10:54:39'),
(11, 'App\\Models\\User', 1, 'token', '9fee3bf24825b5d4cd4463c9e38d5ba8b1eac68aa6c6aea64e81cc80c28001cf', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:49', '2025-02-22 10:54:49'),
(12, 'App\\Models\\User', 1, 'token', 'aceae7f45a1123683e360112b4231aa69722d573127b36071a033c6e9217a5b3', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:51', '2025-02-22 10:54:51'),
(13, 'App\\Models\\User', 1, 'token', '5d29cdc1e743a13f3f1d6157027dcd8d656d33bc444047b5036020182ca5b4ed', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:53', '2025-02-22 10:54:53'),
(14, 'App\\Models\\User', 1, 'token', 'dde7c8e269cd96654f15850712cbfd78fbdb1d9395873d0fb8b979a5fffe7d96', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:54', '2025-02-22 10:54:54'),
(15, 'App\\Models\\User', 1, 'token', '4572a6e21b33b823ea7f1377dedad42de320ac091cdd594e7f00acf7d45cbd71', '[\"*\"]', NULL, NULL, '2025-02-22 10:54:59', '2025-02-22 10:54:59'),
(16, 'App\\Models\\User', 1, 'token', '21ef1428e79a365204e81ad3577ccd063f0504685cdcd9a28b725172779a4bd5', '[\"*\"]', NULL, NULL, '2025-02-22 10:55:10', '2025-02-22 10:55:10'),
(17, 'App\\Models\\User', 1, 'token', '8aee8e1105b0f48ddfeeef872a30f540ecdda01735366e4a43f3b3c6ed937bf1', '[\"*\"]', '2025-02-23 11:50:17', NULL, '2025-02-22 10:55:21', '2025-02-23 11:50:17'),
(18, 'App\\Models\\User', 1, 'token', '6610fea450d4e6fd60902552271a9985bed160ce308a9827459da59c52bff20f', '[\"*\"]', NULL, NULL, '2025-02-24 06:40:32', '2025-02-24 06:40:32'),
(19, 'App\\Models\\User', 1, 'token', '30c35d99b8fa0dd81f45e83f8a15781e4149c53c720e558f7e4c6343a302ef3e', '[\"*\"]', '2025-02-24 13:33:10', NULL, '2025-02-24 06:40:47', '2025-02-24 13:33:10');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `compare_price` double DEFAULT NULL,
  `description` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `sku` varchar(255) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `is_featured` enum('yes','no') NOT NULL DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `compare_price`, `description`, `short_description`, `image`, `category_id`, `brand_id`, `qty`, `sku`, `barcode`, `status`, `is_featured`, `created_at`, `updated_at`) VALUES
(4, 'Dummy', 10.2, NULL, NULL, NULL, NULL, 1, 1, NULL, 'hummy', NULL, 1, 'no', '2025-02-22 09:00:03', '2025-02-22 09:00:03'),
(13, 'shtr', 10.2, NULL, 'hdhfcdg', 'ddhngfxn', NULL, 1, 1, 10, 'hn', 'hngh', 1, 'no', '2025-02-22 12:28:16', '2025-02-22 12:28:16'),
(14, 'shtr', 10.2, NULL, 'hdhfcdg', 'ddhngfxn', NULL, 1, 1, 10, 'hbn', 'hngh', 1, 'no', '2025-02-22 12:29:12', '2025-02-22 12:29:12'),
(15, 'shtr', 10.2, NULL, 'hdhfcdcg', 'ddhngfxn', '15-1740249635.jpg', 1, 1, 10, 'hbcn', 'hngh', 1, 'no', '2025-02-22 12:40:35', '2025-02-22 12:40:36'),
(16, 'Sas', 23, NULL, NULL, 'asxca', NULL, 1, 1, NULL, '32r', NULL, 1, 'yes', '2025-02-23 08:37:46', '2025-02-23 08:37:46'),
(17, 'ee', 2, NULL, NULL, 'eee', NULL, 1, 1, NULL, 'e', NULL, 0, 'yes', '2025-02-23 08:42:30', '2025-02-23 08:42:30'),
(20, 'Web Development', 32, 23, NULL, 'acASC', NULL, 1, 1, 23, '23rd', NULL, 0, 'yes', '2025-02-23 10:22:51', '2025-02-23 10:22:51'),
(21, 'test', 43, 34, NULL, 'test', NULL, 1, 1, 43, '4w4', NULL, 1, 'yes', '2025-02-23 10:25:17', '2025-02-23 10:25:17'),
(22, 'test', 43, 34, '<p><em>34r34w</em></p>', 'rr34w3r4', NULL, 1, 1, 43, '4w4we', '3w', 1, 'yes', '2025-02-23 10:29:08', '2025-02-23 10:29:08'),
(23, 'test3', 44, 34, '<p><strong><u>test3</u></strong></p>', 'test3', '23-1740330805.png', 1, 1, 43, 'fer3', 'frer3', 1, 'yes', '2025-02-23 11:13:25', '2025-02-23 11:13:26'),
(24, 'DASDsdvx', 23, 3, '<p>vzsdvsa</p>', 'dsvsd', '24-1740331193.png', 1, 1, 23, 'wed32rdsw3', '23rew3', 1, 'yes', '2025-02-23 11:19:53', '2025-02-23 11:19:53'),
(25, 'Web Development', 23, 34, '<p>qwd</p>', 'qwd', '25-1740332615.png', 1, 1, 43, '4w4weewq', 'frer3ww', 1, 'yes', '2025-02-23 11:43:35', '2025-02-23 11:43:36'),
(26, 'Web Development', 23, 34, '<p>e</p>', 'ew', '26-1740417421.png', 1, 1, 43, 'eeer', 'frer3ww', 0, '', '2025-02-23 11:50:15', '2025-02-24 11:25:28'),
(27, 'test.2.3', 23, 150, NULL, 'sdsdsad', '27-1740411359.jpg', 1, 1, 23, '32r fh', '3w', 1, 'yes', '2025-02-24 08:37:01', '2025-02-24 12:09:04'),
(28, 'test size create.2', 1, 0.5, NULL, 'size s d', '28-1740421958.png', 1, 1, 2, 'sw', 'e', 1, 'no', '2025-02-24 12:32:38', '2025-02-24 12:39:36'),
(30, 'Web Development', 32, 3, NULL, 'w', '30-79021740423810.png', 1, 1, 2, '2qw', 'qw32w', 0, 'yes', '2025-02-24 13:03:30', '2025-02-24 13:15:11');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 23, '23-1740330805.png', '2025-02-23 11:13:26', '2025-02-23 11:13:26'),
(2, 23, '23-1740330806.png', '2025-02-23 11:13:27', '2025-02-23 11:13:27'),
(3, 24, '24-1740331193.png', '2025-02-23 11:19:53', '2025-02-23 11:19:53'),
(4, 24, '24-1740331193.png', '2025-02-23 11:19:53', '2025-02-23 11:19:53'),
(5, 24, '24-1740331193.png', '2025-02-23 11:19:54', '2025-02-23 11:19:54'),
(6, 25, '25-1740332615.png', '2025-02-23 11:43:36', '2025-02-23 11:43:36'),
(7, 25, '25-1740332616.png', '2025-02-23 11:43:36', '2025-02-23 11:43:36'),
(8, 25, '25-1740332616.png', '2025-02-23 11:43:37', '2025-02-23 11:43:37'),
(9, 26, '26-1740333015.png', '2025-02-23 11:50:15', '2025-02-23 11:50:15'),
(10, 26, '26-1740333015.png', '2025-02-23 11:50:16', '2025-02-23 11:50:16'),
(12, 27, '27-1740407822.png', '2025-02-24 08:37:03', '2025-02-24 08:37:03'),
(13, 27, '27-1740407823.png', '2025-02-24 08:37:03', '2025-02-24 08:37:03'),
(14, 27, '27-1740411246.jpg', '2025-02-24 09:34:06', '2025-02-24 09:34:06'),
(15, 27, '27-1740411359.jpg', '2025-02-24 09:36:00', '2025-02-24 09:36:00'),
(16, 27, '27-1740415630.jpg', '2025-02-24 10:47:10', '2025-02-24 10:47:10'),
(17, 27, '27-1740415638.jpg', '2025-02-24 10:47:18', '2025-02-24 10:47:18'),
(18, 26, '26-1740417421.png', '2025-02-24 11:17:02', '2025-02-24 11:17:02'),
(19, 28, '28-1740421958.png', '2025-02-24 12:32:39', '2025-02-24 12:32:39'),
(23, 30, '30-1740424502.png', '2025-02-24 13:15:02', '2025-02-24 13:15:02'),
(24, 30, '30-1740424507.png', '2025-02-24 13:15:08', '2025-02-24 13:15:08');

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `size_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `product_id`, `size_id`, `created_at`, `updated_at`) VALUES
(10, 28, 1, '2025-02-24 12:39:36', '2025-02-24 12:39:36'),
(11, 28, 2, '2025-02-24 12:39:36', '2025-02-24 12:39:36'),
(18, 27, 2, '2025-02-24 13:16:22', '2025-02-24 13:16:22');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('BQ6CvbCjxtQfKnndx7pyB3xszpLarHIcdLKGLXsT', NULL, '127.0.0.1', 'PostmanRuntime/7.39.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSDJKVXlwSlJ4alMxSUt0NGFRZE9MUUdPRXY4b29SSFB5MUdDMVFlUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1740242840),
('hcJNEDV55LC5Yw0BYAtAvNfdbopbhNT8n6dhpoHO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaTFrZnRJU0hFaXFLWW1JVmIySFBSVXFHWDBmRVR2NE81d3BGT2hCZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1740243007),
('I6Hn0fU3KqhYrvRg9qyr262AuXGBCe14aCm1FmoG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQVVTVGR1aDJYeXdFbVU5VE9aRGZRQWZ3N29xemRibkEzak9JZ0pJcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1740400818);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'S', NULL, NULL),
(2, 'M', NULL, NULL),
(3, 'L', NULL, NULL),
(4, 'X', NULL, NULL),
(5, 'XXL', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `temp_images`
--

CREATE TABLE `temp_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `temp_images`
--

INSERT INTO `temp_images` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, '1740244421.jpg', '2025-02-22 11:13:41', '2025-02-22 11:13:41'),
(2, '1740245472.jpg', '2025-02-22 11:31:12', '2025-02-22 11:31:12'),
(3, '1740247022.png', '2025-02-22 11:57:02', '2025-02-22 11:57:02'),
(4, '1740247967.jpg', '2025-02-22 12:12:47', '2025-02-22 12:12:47'),
(5, '1740330035.png', '2025-02-23 11:00:35', '2025-02-23 11:00:35'),
(6, '1740330044.png', '2025-02-23 11:00:44', '2025-02-23 11:00:44'),
(7, '1740330076.png', '2025-02-23 11:01:16', '2025-02-23 11:01:16'),
(8, '1740330551.png', '2025-02-23 11:09:11', '2025-02-23 11:09:11'),
(9, '1740330797.png', '2025-02-23 11:13:17', '2025-02-23 11:13:17'),
(10, '1740330800.png', '2025-02-23 11:13:20', '2025-02-23 11:13:20'),
(11, '1740330968.png', '2025-02-23 11:16:08', '2025-02-23 11:16:08'),
(12, '1740330986.png', '2025-02-23 11:16:26', '2025-02-23 11:16:26'),
(13, '1740330989.png', '2025-02-23 11:16:29', '2025-02-23 11:16:29'),
(14, '1740331100.png', '2025-02-23 11:18:20', '2025-02-23 11:18:20'),
(15, '1740331186.png', '2025-02-23 11:19:46', '2025-02-23 11:19:46'),
(16, '1740331188.png', '2025-02-23 11:19:48', '2025-02-23 11:19:48'),
(17, '1740331191.png', '2025-02-23 11:19:51', '2025-02-23 11:19:51'),
(18, '1740331771.png', '2025-02-23 11:29:31', '2025-02-23 11:29:31'),
(19, '1740331779.png', '2025-02-23 11:29:39', '2025-02-23 11:29:39'),
(20, '1740331784.png', '2025-02-23 11:29:44', '2025-02-23 11:29:44'),
(21, '1740331912.png', '2025-02-23 11:31:52', '2025-02-23 11:31:52'),
(22, '1740332344.png', '2025-02-23 11:39:04', '2025-02-23 11:39:04'),
(23, '1740332429.png', '2025-02-23 11:40:29', '2025-02-23 11:40:29'),
(24, '1740332436.png', '2025-02-23 11:40:36', '2025-02-23 11:40:36'),
(25, '1740332446.png', '2025-02-23 11:40:46', '2025-02-23 11:40:46'),
(26, '1740332542.png', '2025-02-23 11:42:22', '2025-02-23 11:42:22'),
(27, '1740332548.png', '2025-02-23 11:42:28', '2025-02-23 11:42:28'),
(28, '1740332598.png', '2025-02-23 11:43:18', '2025-02-23 11:43:18'),
(29, '1740333006.png', '2025-02-23 11:50:06', '2025-02-23 11:50:06'),
(30, '1740333008.png', '2025-02-23 11:50:08', '2025-02-23 11:50:08'),
(31, '1740407783.png', '2025-02-24 08:36:23', '2025-02-24 08:36:23'),
(32, '1740407790.png', '2025-02-24 08:36:30', '2025-02-24 08:36:30'),
(33, '1740407804.png', '2025-02-24 08:36:44', '2025-02-24 08:36:44'),
(34, '1740414959.png', '2025-02-24 10:35:59', '2025-02-24 10:35:59'),
(35, '1740415039.png', '2025-02-24 10:37:19', '2025-02-24 10:37:19'),
(36, '1740415073.png', '2025-02-24 10:37:53', '2025-02-24 10:37:53'),
(37, '1740421955.png', '2025-02-24 12:32:35', '2025-02-24 12:32:35'),
(38, '1740422429.png', '2025-02-24 12:40:29', '2025-02-24 12:40:29'),
(39, '1740423803.png', '2025-02-24 13:03:23', '2025-02-24 13:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@admin.com', 'admin', '2025-02-22 08:41:34', '$2y$12$53h5agf6Xb0hAc3rwb3X6e.4eeF.k6FAEnMCQbtrVJc4SvbXd1iqW', 'NSAZZTS3cQ', '2025-02-22 08:41:35', '2025-02-22 08:41:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sizes_product_id_foreign` (`product_id`),
  ADD KEY `product_sizes_size_id_foreign` (`size_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temp_images`
--
ALTER TABLE `temp_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `temp_images`
--
ALTER TABLE `temp_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_sizes_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
