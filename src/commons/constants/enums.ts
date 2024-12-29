export enum UserRoles {
  ADMIN = 'admin',
  SUB_ADMIN = 'subAdmin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active', // Active user
  DELETED = 'deleted', // Deleted user itself
  BLOCKED = 'blocked', // Blocked by admin
}

export enum CommonPermissions {
  // common permissions
  GET_ME = 'get_me',
  UPDATE_ME = 'update_me',
  DELETE_ME = 'delete_me',
  UPLOAD_PROFILE_PIC = 'upload_profile_pic',
  REQUEST_PASSWORD_UPDATE = 'request_password_update',
  UPDATE_PASSWORD = 'update_password',
  CHANGE_PASSWORD_WITH_CURRENT_PASSWORD = 'change_password_with_current_password',
  ENABLE_TWO_FACTOR_AUTHENTICATION = 'enable_two_factor_authentication',
  DISABLE_TWO_FACTOR_AUTHENTICATION = 'disable_two_factor_authentication',
  REQUEST_EMAIL_VERIFICATION_OTP = 'request_email_verification_otp',
  VERIFY_EMAIL = 'verify_email',
  REQUEST_PHONE_VERIFICATION_OTP = 'request_phone_verification_otp',
  VERIFY_PHONE = 'verify_phone',

  // plan
  READ_ALL_PLAN = 'read_all_plan',
  READ_PLAN = 'read_plan',

  // subscriptions
  CREATE_SUBSCRIPTION = 'create_subscription',
  READ_SUBSCRIPTION = 'get_subscription',
  UPDATE_SUBSCRIPTION = 'update_subscription',
  DELETE_SUBSCRIPTION = 'delete_subscription',
  CANCEL_SUBSCRIPTION = 'cancel_subscription',
  GET_STRIPE_CUSTOMER_PORTAL = 'get_stripe_customer_portal',

  // keyword
  CREATE_KEYWORD = 'create_keyword',
  READ_ALL_KEYWORD = 'read_all_keyword',
  READ_KEYWORD = 'read_keyword',
  UPDATE_KEYWORD = 'update_keyword',
  DELETE_KEYWORD = 'delete_keyword',

  // article
  CREATE_ARTICLE = 'create_article',
  READ_ALL_ARTICLE = 'read_all_article',
  READ_ARTICLE = 'read_article',
  UPDATE_ARTICLE = 'update_article',
  DELETE_ARTICLE = 'delete_article',

  // Integrate Website
  CREATE_INTEGRATE_WEBSITE = 'create_integrate_website',
  READ_MY_INTEGRATE_WEBSITE = 'read_all_integrate_website',
  READ_INTEGRATE_WEBSITE = 'read_integrate_website',
  UPDATE_INTEGRATE_WEBSITE = 'update_integrate_website',
  DELETE_INTEGRATE_WEBSITE = 'delete_integrate_website',

  // Upload Blog to WordPress
  CREATE_BLOG_TO_WORDPRESS = 'create_blog_to_wordpress',
  READ_MY_ALL_BLOG_TO_WORDPRESS = 'read_all_blog_to_wordpress',
  READ_MY_BLOG_TO_WORDPRESS = 'read_blog_to_wordpress',
  UPDATE_BLOG_TO_WORDPRESS = 'update_blog_to_wordpress',
  DELETE_BLOG_TO_WORDPRESS = 'delete_blog_to_wordpress',
  UPLOAD_IMAGE_TO_WORDPRESS = 'upload_image_to_wordpress',

  // Shopify APIs
  INTEGRATE_SHOPIFY_SITE = 'integrate_shopify_site',
  CREATE_SHOPIFY_BLOG = 'create_shopify_blog',
  GET_ALL_BLOGS_FROM_SHOPIFY = 'get_all_blogs_from_shopify',
  GET_SINGLE_BLOG_FROM_SHOPIFY = 'get_single_blog_from_shopify',
  GET_BLOG_COUNT_FROM_SHOPIFY = 'get_blog_count_from_shopify',
  UPDATE_SHOPIFY_BLOG = 'update_shopify_blog',
  DELETE_SHOPIFY_BLOG = 'delete_shopify_blog',
  CREATE_SHOPIFY_ARTICLE = 'create_shopify_article',
  GET_ALL_ARTICLES_FROM_SHOPIFY = 'get_all_articles_from_shopify',
  GET_SINGLE_ARTICLE_FROM_SHOPIFY = 'get_single_article_from_shopify',
  GET_ARTICLE_COUNT_FROM_SHOPIFY = 'get_article_count_from_shopify',
  GET_ARTICLE_TAGS_FROM_SHOPIFY = 'get_article_tags_from_shopify',
  UPDATE_SHOPIFY_ARTICLE = 'update_shopify_article',
  DELETE_SHOPIFY_ARTICLE = 'delete_shopify_article',
  GET_ALL_ARTICLE_TAGS_FROM_BLOG = 'get_all_article_tags_from_blog',
  GET_ALL_ARTICLES_FROM_BLOG = 'get_all_articles_from_blog',
  GET_SINGLE_ARTICLE_FROM_BLOG = 'get_single_article_from_blog',
  GET_ALL_ARTICLES_AUTHORS = 'get_all_articles_authors',

  // Wix APIs
  INTEGRATE_WIX_SITE = 'integrate_wix_site',
  CREATE_DRAFT_WIX_POST = 'create_draft_wix_post',
  GET_ALL_PUBLISHED_BLOGS_POSTS_FROM_WIX = 'get_all_published_blogs_posts_from_wix',
  GET_ALL_DRAFT_BLOGS_POSTS_FROM_WIX = 'get_all_draft_blogs_posts_from_wix',
  GET_SINGLE_BLOG_FROM_WIX = 'get_single_blog_from_wix',
  GET_BLOG_COUNT_FROM_WIX = 'get_blog_count_from_wix',
}

export enum VisitorPermissions {
  READ_VISITOR_CONTENT = 'read_visitor_content',
}

export enum AdminPermissions {
  // user
  CREATE_USER = 'create_user',
  READ_ALL_USERS = 'read_all_users',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',
  BLOCK_USER = 'block_user',

  // role
  CREATE_ROLE = 'create_role',
  READ_ALL_ROLES = 'read_all_roles',
  READ_ROLE = 'read_role',
  UPDATE_ROLE = 'update_role',
  DELETE_ROLE = 'delete_role',
  ASSIGN_NEW_PERMISSION_ROLE = 'assign_new_permission_role',
  CHANGE_USER_ROLE = 'change_user_role',

  // permission
  CREATE_PERMISSION = 'create_permission',
  READ_ALL_PERMISSIONS = 'read_all_permissions',
  READ_PERMISSION = 'read_permission',
  UPDATE_PERMISSION = 'update_permission',
  DELETE_PERMISSION = 'delete_permission',

  // subscriptions
  READ_ALL_SUBSCRIPTION = 'get_all_subscriptions',

  // siteInfo
  CREATE_SITEINFO = 'create_siteinfo',
  READ_SITEINFO = 'get_siteinfo',
  UPDATE_SITEINFO = 'update_siteinfo',
  DELETE_SITEINFO = 'delete_siteinfo',

  // Plan
  CREATE_PLAN = 'create_plan',
  ORIGNAL_PLAN = 'orignal_plan',
  UPDATE_PLAN = 'update_plan',
  DELETE_PLAN = 'delete_plan',

  // Feature
  DELETE_FEATURE = 'delete_feature',
  UPDATE_FEATURE = 'update_feature',
  CREATE_FEATURE = 'create_feature',
  READ_FEATURE = 'read_feature',
}

export enum SubAdminPermissions {
  READ_ALL_USERS = 'read_all_users',

  // Feature
  CREATE_FEATURE = 'create_feature',
  READ_ALL_FEATURE = 'read_all_feature',
  READ_FEATURE = 'read_feature',
  UPDATE_FEATURE = 'update_feature',

  // Subscriptions
  UPDATE_SUBSCRIPTIONS = 'update_subscriptions',
}

// Notification Types ENUM
export enum NotificationTypes {
  MESSAGE = 'message',
  ALERT = 'alert',
  REMINDER = 'reminder',
  SYSTEM = 'system',
}

// Article Status ENUM
export enum ArticleStatus {
  PENDING = 'pending',
  PUBLISHED = 'published',
}

// Article Types ENUM
export enum KeywordStatus {
  USED = 'used',
  UNUSED = 'unused',
}

// Website Types ENUM
export enum WebsiteTypes {
  WORDPRESS = 'wordpress',
  SHOPIFY = 'shopify',
  WIX = 'wix',
  BLOGGER = 'blogger',
}

export enum HeadingType {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
}

export enum ShopifyArticleStatus {
  ANY = 'any',
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
}

export enum BillingCycle {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum PlanSlug {
  FREE_PLAN = 'free-plan',
  BASIC_PLAN = 'basic-plan',
  PRO_PLAN = 'pro-plan',
  ENTERPRISE_PLAN = 'enterprise-plan',
}

export enum StripeWebhookEvents {
  INVOICE_PAYMENT_SUCCEEDED = 'invoice.paid',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
}

export enum StripeSubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  EXPIRED = 'expired',
}

export enum SOCIAL_MEDIA_PLATFORMS {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Pinterest = 'Pinterest',
  X = 'X', // Twitter
  TikTok = 'TikTok',
  YouTube = 'YouTube',
  Threads = 'Threads',
  BlueSky = 'BlueSky',
}
