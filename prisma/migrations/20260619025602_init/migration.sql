-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('MAHASISWA', 'ADMIN', 'PRODI', 'KAJUR', 'PIMPINAN') NOT NULL DEFAULT 'MAHASISWA',
    `nim` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengajuan` (
    `id` VARCHAR(191) NOT NULL,
    `nomorSurat` VARCHAR(191) NULL,
    `jenisSurat` VARCHAR(191) NOT NULL,
    `keperluan` VARCHAR(191) NOT NULL,
    `status` ENUM('BARU', 'DIPERIKSA', 'DIVERIFIKASI', 'DIPROSES', 'DITANDATANGANI', 'DITERIMA', 'DIARSIPKAN') NOT NULL DEFAULT 'BARU',
    `catatan` VARCHAR(191) NULL,
    `filePath` VARCHAR(191) NULL,
    `suratPath` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Pengajuan_nomorSurat_key`(`nomorSurat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Riwayat` (
    `id` VARCHAR(191) NOT NULL,
    `pengajuanId` VARCHAR(191) NOT NULL,
    `status` ENUM('BARU', 'DIPERIKSA', 'DIVERIFIKASI', 'DIPROSES', 'DITANDATANGANI', 'DITERIMA', 'DIARSIPKAN') NOT NULL,
    `catatan` VARCHAR(191) NULL,
    `aktor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengajuan` ADD CONSTRAINT `Pengajuan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Riwayat` ADD CONSTRAINT `Riwayat_pengajuanId_fkey` FOREIGN KEY (`pengajuanId`) REFERENCES `Pengajuan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
