/*
  Warnings:

  - You are about to drop the column `is_paid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_user_id_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `is_paid`,
    ADD COLUMN `payment_status` ENUM('PENDING', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `category`,
    ADD COLUMN `category_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- DropTable
DROP TABLE `tokens`;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
