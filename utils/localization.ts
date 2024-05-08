// ./localization.js
const translations = {
  en: {
    // Sign In Section
    signin: "Sign In",
    signing_in: "processing your request",
    signin_subtitle: "Enter Your Credentials to Continue",
    register: "Sign Up",
    enter_email: "Enter Email",
    invalid_email: "Please provide a valid email address",
    provide_email: "Please provide your email",
    enter_password: "Enter Password",
    forgot_password: "Forgot Password?",
    too_many_requests: "Too many requests",
    reset_link: "Check your email for password reset link",
    invalid_credentials: "Invalid email or password",
    invalid_mail_address: "Invalid email",
    failed_login: "Failed to login",
    have_an_account: "Don’t have an Account ?",
    remember_me: "Remember me",

    // Home Page
    current_date_label: "Today",
    study_live_label: "Study live with 2,589 others",
    upcoming_due_dates: "Upcoming due dates",

    // Navigation Bar
    home: "Home",
    schedule: "Schedule",
    groups: "Groups",
    settings: "Settings",

    // Courses
    psychology: "Psychology",
    biology: "Biology",
    physics: "Physics",
    mathematics: "Mathematics",
    add_custom_course: "Add Custom Course",
    enter_course_name: "Enter Course Name",
    add: "Add",
    add_custom_courses: "Add Custom Courses",
    next: "Next",

    // Reminders
    reminder_subtitle: "Your {1} is Due on",
    biology_assignment: "Biology Assignment",
    got_it: "GOT IT",

    // Account Creation
    create_account_label: "Create an Account",
    full_name: "Full Name",
    email_address: "Email Address",
    confirm_password: "Confirm Password",
    sign_up: "Sign Up",
    already_have_account: "Already have an Account ?",
    password_mismatch: "Passwords do not match",

    // Schedule
    schedule_label: "Schedule",
    plan_label: "Plan",
    completed_label: "Completed",
    // ... other translations ...

    // Share Schedule Section
    share_schedule_title: "Share Your Schedule",
    choose_timeline: "Choose Your Timeline that you want to share",
    choose_date: "Choose Date",
    date_label: "Date",
    choose_time: "Choose Time",
    from_label: "From",
    to_label: "To",
    share_button: "Share",
    copy_link_button: "Copy Link",
    study: "📗 Study",
    exercise: "🏋️ Exercise",
    sleep: "💤 Sleep",
    chill: "🥳 Chill",
    gym: "🏋️‍♂️ Gym",

    // Class Section
    class_title: "Class",
    task_title: "Task",

    schedule_class_button: "Schedule a Class",

    // Schedule Frequency Section
    schedule_frequency_title: "Choose Frequency",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",

    // Note Section
    note_title: "Add Note",
    note_placeholder: "Type the note here...",

    // Schedule Confirmation Section
    schedule_confirmation_title: "Congratulations!",
    schedule_confirmation_message: "Class Scheduled!",
    share_schedule_reminder: "Share your Schedule!",
    not_now_button: "Not Now",

    // Class Scheduled Section
    class_scheduled_title: "Congratulations",
    class_scheduled_message: "Class Scheduled",

    // Groups Section
    groups_title: "Your Groups",
    create_group_button: "Create",
    joined_groups_title: "Joined groups({__})",
    joined_groups_description: "The groups that you have joined",
    featured_groups_title: "Featured Groups",
    top_trending_study_groups_title: "Top trending Study groups",

    // Group Details Section
    group_owner_label: "Group Owner",
    live_members_count: "{number} live Now",
    join_live_button: "Join Live",
    view_leaderboard_button: "View Leaderboard",
    leave_group_button: "Leave Group",

    // Focus Mode Section
    focus_mode_title: "Focus Mode",
    study_together_button: "Study Together",
    this_week: "This week",
    this_month: "This month",
    all_time: "All Time",

    // Group Information Section
    group_title_label: "Group Title",
    group_bio_label: "Group Bio",
    add_time_button: "Add Time",
    at_symbol: "@",

    // Timer Settings Section
    timer_settings_title: "Timer Settings",
    timer_on_label: "Timer ON",

    // Account Section
    account_title: "Your Account",
    edit_profile_button: "Edit profile",
    manage_account_button: "Manage account",
    contact_support_button: "Contact support",

    // Community Section
    community_title: "Community",
    faqs_title: "FAQ’s",
    logout_button: "Logout",
  },

  ar: {
    // Sign In Section
    signin: "تسجيل الدخول",
    signing_in: "يعالج طلبك",
    signin_subtitle: "أدخل بيانات   الخاصة بك للمتابعة",
    register: "اشتراك",
    enter_email: "أدخل البريد الإلكتروني",
    invalid_email: "من فضلك زود عنوان بريد إلكتروني صحيح",
    provide_email: "من فضلك، أدخل بريدك الإلكتروني",
    enter_password: "أدخل كلمة المرور",
    forgot_password: "هل نسيت كلمة السر؟",
    too_many_requests: "كثرة الطلبات",
    invalid_credentials: "بريد إلكتروني أو كلمة مرور غير صحيحة",
    invalid_mail_address: "بريد إلكتروني غير صالح",
    failed_login: "فشل تسجيل الدخول",
    have_an_account: "ليس لديك حساب ؟",
    remember_me: "تذكرنى",

    // Home Page
    current_date_label: "اليوم",
    study_live_label: "الدراسة مباشرة مع 2,589 آخرين",
    upcoming_due_dates: "مواعيد الاستحقاق القادمة",

    // Navigation Bar
    home: "بيت",
    schedule: "جدول",
    groups: "مجموعات",
    settings: "إعدادات",

    // Courses
    psychology: "علم النفس",
    biology: "مادة الاحياء",
    physics: "الفيزياء",
    mathematics: "الرياضيات",
    add_custom_course: "إضافة دورة مخصصة",
    enter_course_name: "أدخل اسم الدورة",
    add: "يضيف",
    add_custom_courses: "إضافة دورات مخصصة",
    next: "التالي",

    // Reminders
    reminder_subtitle: "مهمة علم {} الخاصة بك هيمستحق في",
    biology_assignment: "مهمة علم الأحياء",
    got_it: "فهمتها",

    // Account Creation
    create_account_label: "إنشاء حساب",
    full_name: "الاسم الكامل",
    email_address: "عنوان البريد الإلكتروني",
    confirm_password: "تأكيد كلمة المرور",
    sign_up: "اشتراك",
    already_have_account: "هل لديك حساب ؟",
    password_mismatch: "كلمات المرور غير متطابقة",

    // Schedule
    schedule_label: "جدول",
    plan_label: "يخطط",
    completed_label: "مكتمل",

    // Share Schedule Section
    share_schedule_title: "مشاركة الجدول الزمني الخاص بك",
    choose_timeline: "اختر الجدول الزمني الخاص بك الذي تريد مشاركته",
    choose_date: "اختر موعدا",
    date_label: "تاريخ",
    choose_time: "اختر الوقت",
    from_label: "من",
    to_label: "ل",
    share_button: "يشارك",
    copy_link_button: "نسخ الوصلة",

    study: "📗 يذاكر",
    exercise: "🏋️ يمارس",
    sleep: "💤 ينام",
    chill: "🥳 برد",
    gym: "🏋️‍♂️ نادي رياضي",

    // Class Section
    class_title: "فصل",
    task_title: "مهمة",

    schedule_class_button: "جدولة فصل دراسي",

    // Schedule Frequency Section
    schedule_frequency_title: "اختر تكرار",
    daily: "يوميًا",
    weekly: "أسبوعيا",
    monthly: "شهريا",

    // Note Section
    note_title: "أضف ملاحظة",
    note_placeholder: "اكتب الملاحظة هنا...",

    // Schedule Confirmation Section
    schedule_confirmation_title: "تهانينا",
    schedule_confirmation_message: "تم جدولة الفصل !",
    share_schedule_reminder: "يمكنك دائمًا مشاركة جدولك الزمني!",
    not_now_button: "ليس الآن",

    // Class Scheduled Section
    class_scheduled_title: "تهانينا",
    class_scheduled_message: "تم جدولة الفصل",

    // Groups Section
    groups_title: "مجموعاتك",
    create_group_button: "يخلق",
    joined_groups_title: "المجموعات المنضمة({__})",
    joined_groups_description: "المجموعات التي انضممت إليها",
    featured_groups_title: "المجموعات المميزة",
    top_trending_study_groups_title: "أعلى مجموعات الدراسة تتجه",

    // Group Details Section
    group_owner_label: "مالك المجموعة",
    live_members_count: "{number} يعيش الآن",
    join_live_button: "انضم لايف",
    view_leaderboard_button: "عرض المتصدرين",
    leave_group_button: "غادر المجموعة",

    // Focus Mode Section
    focus_mode_title: "وضع التركيز",
    study_together_button: "الدراسة معًا",
    this_week: "هذا الاسبوع",
    this_month: "هذا الشهر",
    all_time: "كل الوقت",

    // Group Information Section
    group_title_label: "عنوان المجموعة",
    group_bio_label: "المجموعة الحيوية",
    add_time_button: "إضافة وقت",
    at_symbol: "@",

    // Timer Settings Section
    timer_settings_title: "إعدادات الموقت",
    timer_on_label: "المؤقت يعمل",

    // Account Section
    account_title: "الحساب الخاص بك",
    edit_profile_button: "تعديل الملف الشخصي",
    manage_account_button: "إدارة الحساب",
    contact_support_button: "اتصل بالدعم",

    // Community Section
    community_title: "مجتمع",
    faqs_title: "الأسئلة الشائعة",
    logout_button: "تسجيل خروج",
  },
};

export { translations };
