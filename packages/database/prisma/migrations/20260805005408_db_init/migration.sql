-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "SystemRole" AS ENUM ('System', 'Admin', 'Editor', 'User');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('Guest', 'Member');

-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('SUNDAY_SERVICE', 'MIDWEEK_SERVICE', 'MINISTRY_EVENT', 'SCHOOL_EVENT', 'HOUSE_GROUP', 'BIBLE_STUDY');

-- CreateEnum
CREATE TYPE "AnnouncementAudience" AS ENUM ('CHURCH_WIDE', 'SCHOOL_ONLY', 'MINISTRY_SPECIFIC');

-- CreateEnum
CREATE TYPE "EventScope" AS ENUM ('IN_HOUSE', 'MINISTRY_DEPARTMENT', 'COLLABORATION');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FulfillmentMethod" AS ENUM ('HOME_DELIVERY', 'CHURCH_PICKUP');

-- CreateEnum
CREATE TYPE "FinancialPurpose" AS ENUM ('TITHE', 'OFFERING', 'GENERAL_FUND_ALLOCATION');

-- CreateEnum
CREATE TYPE "PledgeStatus" AS ENUM ('PENDING', 'PARTIALLY_FULFILLED', 'FULFILLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MaterialCategory" AS ENUM ('FOOD', 'CLOTHES', 'EQUIPMENT', 'OTHER');

-- CreateTable
CREATE TABLE "user" (
    "user" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),
    "systemRole" "SystemRole" NOT NULL DEFAULT 'User',
    "membershipStatus" "MembershipStatus" NOT NULL DEFAULT 'Guest',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user")
);

-- CreateTable
CREATE TABLE "profile" (
    "profile" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "avatarUrls" TEXT[],
    "backgroundUrls" TEXT[],
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profile")
);

-- CreateTable
CREATE TABLE "staff_profile" (
    "staffProfile" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "avatarUrls" TEXT[],
    "backgroundUrls" TEXT[],
    "title" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_profile_pkey" PRIMARY KEY ("staffProfile")
);

-- CreateTable
CREATE TABLE "deacon_profile" (
    "deaconProfile" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "avatarUrls" TEXT[],
    "backgroundUrls" TEXT[],
    "ordinationDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "pdbRole" TEXT,
    "termStartDate" TIMESTAMP(3),
    "termEndDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deacon_profile_pkey" PRIMARY KEY ("deaconProfile")
);

-- CreateTable
CREATE TABLE "membership_progress" (
    "membershipProgress" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isBaptized" BOOLEAN NOT NULL DEFAULT false,
    "completedShapeClass" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "membership_progress_pkey" PRIMARY KEY ("membershipProgress")
);

-- CreateTable
CREATE TABLE "ministry" (
    "ministry" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "headId" TEXT,

    CONSTRAINT "ministry_pkey" PRIMARY KEY ("ministry")
);

-- CreateTable
CREATE TABLE "department" (
    "department" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ministryId" TEXT NOT NULL,
    "headId" TEXT,

    CONSTRAINT "department_pkey" PRIMARY KEY ("department")
);

-- CreateTable
CREATE TABLE "ministry_member" (
    "ministryMember" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "ministryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ministry_member_pkey" PRIMARY KEY ("ministryMember")
);

-- CreateTable
CREATE TABLE "department_member" (
    "departmentMember" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "department_member_pkey" PRIMARY KEY ("departmentMember")
);

-- CreateTable
CREATE TABLE "prayer_request" (
    "prayerRequest" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "requesterName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prayer_request_pkey" PRIMARY KEY ("prayerRequest")
);

-- CreateTable
CREATE TABLE "community_post" (
    "communityPost" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "category" "PostCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "themeText" TEXT,
    "mediaUrls" TEXT[],
    "eventId" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "community_post_pkey" PRIMARY KEY ("communityPost")
);

-- CreateTable
CREATE TABLE "daily_verse" (
    "dailyVerse" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "verseLine" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_verse_pkey" PRIMARY KEY ("dailyVerse")
);

-- CreateTable
CREATE TABLE "sermon_series" (
    "sermonSeries" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sermon_series_pkey" PRIMARY KEY ("sermonSeries")
);

-- CreateTable
CREATE TABLE "sermon" (
    "sermon" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "audioUrl" TEXT,
    "thumbnailUrl" TEXT,
    "preacher" TEXT NOT NULL,
    "preachedAt" TIMESTAMP(3) NOT NULL,
    "seriesId" TEXT,
    "slideUrls" TEXT[],
    "handoutUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sermon_pkey" PRIMARY KEY ("sermon")
);

-- CreateTable
CREATE TABLE "announcement" (
    "announcement" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "posterUrl" TEXT,
    "audience" "AnnouncementAudience" NOT NULL DEFAULT 'CHURCH_WIDE',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("announcement")
);

-- CreateTable
CREATE TABLE "event" (
    "event" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "maxCapacity" INTEGER,
    "posterUrl" TEXT,
    "scope" "EventScope" NOT NULL DEFAULT 'IN_HOUSE',
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "ministryId" TEXT,
    "departmentId" TEXT,
    "partnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("event")
);

-- CreateTable
CREATE TABLE "external_partner" (
    "externalPartner" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactName" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "external_partner_pkey" PRIMARY KEY ("externalPartner")
);

-- CreateTable
CREATE TABLE "event_registration" (
    "eventRegistration" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'CONFIRMED',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registration_pkey" PRIMARY KEY ("eventRegistration")
);

-- CreateTable
CREATE TABLE "volunteer_signup" (
    "volunteerSignup" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredRole" TEXT,
    "notes" TEXT,
    "signedUpAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteer_signup_pkey" PRIMARY KEY ("volunteerSignup")
);

-- CreateTable
CREATE TABLE "category" (
    "category" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category")
);

-- CreateTable
CREATE TABLE "product" (
    "product" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "ministryId" TEXT,
    "departmentId" TEXT,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product")
);

-- CreateTable
CREATE TABLE "product_variant" (
    "productVariant" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "size" TEXT,
    "color" TEXT,
    "stockCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("productVariant")
);

-- CreateTable
CREATE TABLE "order" (
    "order" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "fulfillmentMethod" "FulfillmentMethod" NOT NULL DEFAULT 'CHURCH_PICKUP',
    "shippingAddress" TEXT,
    "trackingNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("order")
);

-- CreateTable
CREATE TABLE "order_item" (
    "orderItem" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productVariantId" TEXT,
    "quantity" TEXT NOT NULL,
    "priceAtPurchase" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("orderItem")
);

-- CreateTable
CREATE TABLE "donation_campaign" (
    "donationCampaign" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetGoal" DECIMAL(12,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donation_campaign_pkey" PRIMARY KEY ("donationCampaign")
);

-- CreateTable
CREATE TABLE "donation" (
    "donation" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "campaignId" TEXT,
    "purpose" "FinancialPurpose" NOT NULL DEFAULT 'GENERAL_FUND_ALLOCATION',
    "amount" DECIMAL(12,2) NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "ministryId" TEXT,
    "departmentId" TEXT,
    "eventId" TEXT,
    "isSchoolProject" BOOLEAN NOT NULL DEFAULT false,
    "pledgeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donation_pkey" PRIMARY KEY ("donation")
);

-- CreateTable
CREATE TABLE "material_donation_campaign" (
    "materialDonationCampaign" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_donation_campaign_pkey" PRIMARY KEY ("materialDonationCampaign")
);

-- CreateTable
CREATE TABLE "material_donation_campaign_item" (
    "materialDonationCampaignItem" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "materialCampaignId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "targetQuantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "material_donation_campaign_item_pkey" PRIMARY KEY ("materialDonationCampaignItem")
);

-- CreateTable
CREATE TABLE "material_donation" (
    "materialDonation" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "category" "MaterialCategory" NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "quantityText" TEXT NOT NULL,
    "dropOffDate" TIMESTAMP(3),
    "isReceived" BOOLEAN NOT NULL DEFAULT false,
    "materialCampaignId" TEXT,
    "ministryId" TEXT,
    "departmentId" TEXT,
    "eventId" TEXT,
    "isSchoolProject" BOOLEAN NOT NULL DEFAULT false,
    "pledgeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_donation_pkey" PRIMARY KEY ("materialDonation")
);

-- CreateTable
CREATE TABLE "pledge" (
    "pledge" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "PledgeStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "pledgedAmount" DECIMAL(12,2),
    "pledgedItemName" TEXT,
    "pledgedItemQty" INTEGER,
    "pledgedItemUnit" TEXT,
    "donationCampaignId" TEXT,
    "ministryId" TEXT,
    "departmentId" TEXT,
    "eventId" TEXT,
    "isSchoolProject" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pledge_pkey" PRIMARY KEY ("pledge")
);

-- CreateTable
CREATE TABLE "payment_transaction" (
    "paymentTransaction" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "checkoutRequestId" TEXT NOT NULL,
    "merchantRequestId" TEXT NOT NULL,
    "reference" TEXT,
    "status" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "rawGatewayResponse" TEXT,
    "orderId" TEXT,
    "donationId" TEXT,
    "eventRegistrationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_transaction_pkey" PRIMARY KEY ("paymentTransaction")
);

-- CreateTable
CREATE TABLE "email_subscriber" (
    "emailSubscriber" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_subscriber_pkey" PRIMARY KEY ("emailSubscriber")
);

-- CreateTable
CREATE TABLE "notification_log" (
    "notificationLog" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sentType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_log_pkey" PRIMARY KEY ("notificationLog")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_id_key" ON "profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "staff_profile_id_key" ON "staff_profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_profile_userId_key" ON "staff_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "deacon_profile_id_key" ON "deacon_profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deacon_profile_userId_key" ON "deacon_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "membership_progress_id_key" ON "membership_progress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "membership_progress_userId_key" ON "membership_progress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ministry_id_key" ON "ministry"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ministry_name_key" ON "ministry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "department_id_key" ON "department"("id");

-- CreateIndex
CREATE UNIQUE INDEX "department_name_ministryId_key" ON "department"("name", "ministryId");

-- CreateIndex
CREATE UNIQUE INDEX "ministry_member_id_key" ON "ministry_member"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ministry_member_ministryId_userId_key" ON "ministry_member"("ministryId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "department_member_id_key" ON "department_member"("id");

-- CreateIndex
CREATE UNIQUE INDEX "department_member_departmentId_userId_key" ON "department_member"("departmentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "prayer_request_id_key" ON "prayer_request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "community_post_id_key" ON "community_post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_verse_id_key" ON "daily_verse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_verse_publishDate_key" ON "daily_verse"("publishDate");

-- CreateIndex
CREATE UNIQUE INDEX "sermon_series_id_key" ON "sermon_series"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sermon_id_key" ON "sermon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "announcement_id_key" ON "announcement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_id_key" ON "event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "external_partner_id_key" ON "external_partner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "external_partner_name_key" ON "external_partner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "event_registration_id_key" ON "event_registration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_registration_eventId_userId_key" ON "event_registration"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_signup_id_key" ON "volunteer_signup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_signup_eventId_userId_key" ON "volunteer_signup"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_id_key" ON "product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_id_key" ON "product_variant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_sku_key" ON "product_variant"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_item_id_key" ON "order_item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "donation_campaign_id_key" ON "donation_campaign"("id");

-- CreateIndex
CREATE UNIQUE INDEX "donation_id_key" ON "donation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "material_donation_campaign_id_key" ON "material_donation_campaign"("id");

-- CreateIndex
CREATE UNIQUE INDEX "material_donation_campaign_item_id_key" ON "material_donation_campaign_item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "material_donation_id_key" ON "material_donation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pledge_id_key" ON "pledge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_id_key" ON "payment_transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_checkoutRequestId_key" ON "payment_transaction"("checkoutRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_reference_key" ON "payment_transaction"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "email_subscriber_id_key" ON "email_subscriber"("id");

-- CreateIndex
CREATE UNIQUE INDEX "email_subscriber_email_key" ON "email_subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "notification_log_id_key" ON "notification_log"("id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_profile" ADD CONSTRAINT "staff_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deacon_profile" ADD CONSTRAINT "deacon_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_progress" ADD CONSTRAINT "membership_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ministry" ADD CONSTRAINT "ministry_headId_fkey" FOREIGN KEY ("headId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_headId_fkey" FOREIGN KEY ("headId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ministry_member" ADD CONSTRAINT "ministry_member_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ministry_member" ADD CONSTRAINT "ministry_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_member" ADD CONSTRAINT "department_member_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_member" ADD CONSTRAINT "department_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prayer_request" ADD CONSTRAINT "prayer_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_post" ADD CONSTRAINT "community_post_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_post" ADD CONSTRAINT "community_post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sermon" ADD CONSTRAINT "sermon_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "sermon_series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "external_partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_signup" ADD CONSTRAINT "volunteer_signup_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_signup" ADD CONSTRAINT "volunteer_signup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "donation_campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_pledgeId_fkey" FOREIGN KEY ("pledgeId") REFERENCES "pledge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation_campaign" ADD CONSTRAINT "material_donation_campaign_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation_campaign_item" ADD CONSTRAINT "material_donation_campaign_item_materialCampaignId_fkey" FOREIGN KEY ("materialCampaignId") REFERENCES "material_donation_campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation" ADD CONSTRAINT "material_donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation" ADD CONSTRAINT "material_donation_materialCampaignId_fkey" FOREIGN KEY ("materialCampaignId") REFERENCES "material_donation_campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation" ADD CONSTRAINT "material_donation_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation" ADD CONSTRAINT "material_donation_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation" ADD CONSTRAINT "material_donation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_donation" ADD CONSTRAINT "material_donation_pledgeId_fkey" FOREIGN KEY ("pledgeId") REFERENCES "pledge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pledge" ADD CONSTRAINT "pledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pledge" ADD CONSTRAINT "pledge_donationCampaignId_fkey" FOREIGN KEY ("donationCampaignId") REFERENCES "donation_campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pledge" ADD CONSTRAINT "pledge_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pledge" ADD CONSTRAINT "pledge_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pledge" ADD CONSTRAINT "pledge_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_eventRegistrationId_fkey" FOREIGN KEY ("eventRegistrationId") REFERENCES "event_registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
