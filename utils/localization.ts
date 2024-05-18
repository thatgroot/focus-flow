// ./localization.js
const translations = {
  en: {
    hi: "Hi",
    good_morning: "Good Morning!",
    go_back: "Go Back",
    signin: "Sign In",
    processing_request: "Processing your request",
    signin_subtitle: "Enter Your Credentials to Continue",
    register: "Sign Up",
    enter_email: "Enter Email",
    invalid_email: "Please provide a valid email address",
    provide_email: "Please provide your email",
    password: "Password",
    enter_password: "Enter Password",
    forgot_password: "Forgot Password?",
    too_many_requests: "Too many requests",
    reset_link: "Check your email for password reset link",
    invalid_credentials: "Invalid email or password",
    invalid_password: "Invalid password",
    invalid_mail_address: "Invalid email",
    failed_login: "Failed to login",
    have_an_account: "Don’t have an Account ?",
    remember_me: "Remember me",

    // Home Page
    today: "Today",
    study_live_label: "Study live with {__} others",
    upcoming_due_dates: "Upcoming due dates",

    // Navigation Bar
    home: "Home",
    schedule: "Schedule",
    groups: "Groups",
    settings: "Settings",

    // Courses
    biology: "Biology",
    chemistry: "Chemistry",
    physics: "Physics",
    psychology: "Psychology",
    islamic: "Islamic",
    english: "English",
    geography: "Geography",
    economy: "Economy",
    mathematics: "Mathematics",
    history: "History",
    arabic: "Arabic",
    add_custom_course: "Add Custom Course",
    enter_course_name: "Enter Course Name",
    add: "Add",
    add_custom_courses: "Add Custom Courses",
    next: "Next",

    // Reminders
    reminder: "Reminder",
    reminder_subtitle: "Your {__} is due on: ",
    biology_assignment: "Biology Assignment",
    got_it: "GOT IT",

    // Language settings
    language_settings: "Language Settings",
    change_language: "Change Language",
    // Account Creation
    create_account_label: "Create an Account",
    full_name: "Full Name",
    email_address: "Email Address",
    change_email_address: "Change Email Address",
    change_password: "Change Password",
    confirm_password: "Confirm Password",
    old_password: "Old Password",
    new_password: "New Password",
    sign_up: "Sign Up",
    already_have_account: "Already have an Account ?",
    password_mismatch: "Passwords do not match",

    // Schedule
    schedule_label: "Schedule",
    plan_label: "Plan",
    completed_label: "Completed",

    active: "Active",
    paused: "Paused",
    inactive: "Inactive",

    no_end_date_available: "No end date available",
    due_date: "Due Date", // New key
    mark_as_complete: "Mark as Complete",

    // ... other translations ...
    recent_group_sessions: "Recent Group Sessions",

    // Share Schedule Section
    share_schedule_title: "Share Your Schedule",
    choose_timeline: "Choose Your Timeline that you want to share",
    choose_date: "Choose Date",
    date_label: "Date",
    choose_time: "Choose Time",
    from_label: "From",
    to_label: "To",
    share: "Share",
    copy_link: "Copy Link",
    study_label: "Study",
    study: "📗 Study",
    exercise: "🏋️ Exercise",
    sleep: "💤 Sleep",
    chill: "🥳 Chill",
    gym: "🏋️‍♂️ Gym",

    // Class Section
    class_title: "Class",
    task_title: "Task",

    schedule_class: "Schedule Class",
    schedule_task: "Schedule Task",

    // ... existing translations
    task_goal: "Task goal",
    track_spent_time: "Track how you spend your time",

    // Schedule Frequency Section
    select_recurrence: "Select an option",
    or: "OR",
    schedule_frequency_title: "Choose Frequency",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",

    add_to_planner: "Add to Planner", // Can be removed if not needed elsewhere

    // Note Section
    note_title: "Add Note",
    note_placeholder: "Type the note here...",

    startDate: "Start Date",
    endDate: "End Date",

    am: "AM",
    pm: "PM",
    finish: "Finish",

    // Schedule Confirmation Section
    schedule_confirmation_title: "Congratulations!",
    schedule_confirmation_message: "Class Scheduled!",
    share_schedule_reminder: "Share your Schedule!",
    not_now: "Not Now",

    // Class Scheduled Section
    class_scheduled_title: "Congratulations",
    class_scheduled_message: "Class Scheduled",
    create: "Create",

    // Groups Section
    groups_title: "Your Groups",
    create_group: "Create",
    joined_groups_title: "Joined groups ({__})",
    joined_groups_description: "The groups that you have joined",
    featured_groups_title: "Featured Groups",
    top_trending_study_groups_title: "Top trending Study groups",

    search_group_placeholder: "Search a group by name",

    // Group Details Section
    group_owner_label: "Group Owner",
    live_members_count: "{__} live Now",
    join_live: "Join Live",
    view_leaderboard: "View Leaderboard",
    leave_group: "Leave Group",

    // Focus Mode Section
    focus_mode_title: "Focus Mode",
    study_together: "Study Together",
    this_week: "This week",
    this_month: "This month",
    all_time: "All Time",

    // Group Information Section
    group_title_label: "Group Title",
    group_bio_label: "Group Bio",
    add_time: "Add Time",
    at_symbol: "@",

    // Timer Settings Section
    timer_settings_title: "Timer Settings",
    timer_on_label: "Timer ON",

    // Account Section
    account_title: "Your Account",
    edit_profile: "Edit profile",
    manage_account: "Manage account",
    contact_support: "Contact support",

    // Community Section
    community_title: "Community",
    faqs_title: "FAQ’s",
    logout: "Logout",
  },

  ar: {
    hi: "مرحبا",
    good_morning: "صباح الخير!",
    go_back: "رجوع",

    signin: "تسجيل الدخول",
    processing_request: "يعالج طلبك",
    signin_subtitle: "أدخل بيانات   الخاصة بك للمتابعة",
    register: "اشتراك",
    enter_email: "أدخل البريد الإلكتروني",
    invalid_email: "من فضلك زود عنوان بريد إلكتروني صحيح",
    provide_email: "من فضلك، أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    enter_password: "أدخل كلمة المرور",
    forgot_password: "هل نسيت كلمة السر؟",
    too_many_requests: "كثرة الطلبات",
    invalid_credentials: "بريد إلكتروني أو كلمة مرور غير صحيحة",
    invalid_password: "كلمة مرور غير صحيحة",
    invalid_mail_address: "بريد إلكتروني غير صالح",
    failed_login: "فشل تسجيل الدخول",
    have_an_account: "ليس لديك حساب ؟",
    remember_me: "تذكرنى",

    // Home Page
    today: "اليوم",
    study_live_label: "الدراسة مباشرة مع {__} آخرين",
    upcoming_due_dates: "مواعيد الاستحقاق القادمة",

    // Navigation Bar
    home: "بيت",
    schedule: "جدول",
    groups: "مجموعات",
    settings: "إعدادات",

    // Courses
    biology: "علم الأحياء",
    chemistry: "كيمياء", // Removed English explanation
    physics: "فيزياء", // Removed English explanation
    psychology: "علم النفس", // Removed English explanation
    islamic: "إسلامية", // Removed English explanation
    english: "اللغة الإنجليزية", // Replaced with Arabic translation
    geography: "جغرافيا", // Removed English explanation
    economy: "اقتصاد", // Removed English explanation
    mathematics: "رياضيات", // Removed English explanation
    history: "تاريخ",
    arabic: "عربي",
    add_custom_course: "إضافة دورة مخصصة",
    enter_course_name: "أدخل اسم الدورة",
    add: "يضيف",
    add_custom_courses: "إضافة دورات مخصصة",
    next: "التالي",

    // Reminders
    reminder: "تذكير",
    reminder_subtitle: "مهمة علم {__} الخاصة بك هيمستحق في",
    biology_assignment: "مهمة علم الأحياء",
    got_it: "فهمتها",
    // Language settings
    language_settings: "إعدادات اللغة",
    change_language: "تغيير اللغة",
    // Account Creation
    create_account_label: "إنشاء حساب",
    full_name: "الاسم الكامل",
    email_address: "عنوان البريد الإلكتروني",
    change_password: "تغيير كلمة المرور",
    change_email_address: "تغيير عنوان البريد الإلكتروني",
    confirm_password: "تأكيد كلمة المرور",
    old_password: "كلمة المرور القديمة",
    new_password: "كلمة المرور الجديدة",
    sign_up: "اشتراك",
    already_have_account: "هل لديك حساب ؟",
    password_mismatch: "كلمات المرور غير متطابقة",

    // Schedule
    schedule_label: "جدول",
    plan_label: "يخطط",
    completed_label: "مكتمل",

    active: "نشط",
    paused: "متوقف مؤقتا",
    inactive: "غير نشط",

    no_end_date_available: "تاريخ الانتهاء غير متوفر",
    due_date: "تاريخ الاستحقاق",
    mark_as_complete: "تم العلامة على أنها مكتملة",

    recent_group_sessions: "جلسات المجموعة الأخيرة",

    // Share Schedule Section
    share_schedule_title: "مشاركة الجدول الزمني الخاص بك",
    choose_timeline: "اختر الجدول الزمني الخاص بك الذي تريد مشاركته",
    choose_date: "اختر موعدا",
    date_label: "تاريخ",
    choose_time: "اختر الوقت",
    from_label: "من",
    to_label: "ل",
    share: "يشارك",
    copy_link: "نسخ الوصلة",

    study_label: "يذاكر",
    study: "📗 يذاكر",
    exercise: "🏋️ يمارس",
    sleep: "💤 ينام",
    chill: "🥳 برد",
    gym: "🏋️‍♂️ نادي رياضي",

    // Class Section
    class_title: "فصل",
    task_title: "مهمة",

    // ... existing translations
    schedule_class: "جدولة الدرس", // Schedule the lesson
    schedule_task: "جدولة المهمة", // Schedule the task

    // ... existing translations
    task_goal: "هدف المهمة", // Goal of the task
    track_spent_time: "تتبع كيفية قضاء وقتك", // Track how you spend your time

    // Schedule Frequency Section
    select_recurrence: "اختر خيارًا",
    or: "أو",
    schedule_frequency_title: "اختر تكرار",
    daily: "يوميًا",
    weekly: "أسبوعيا",
    monthly: "شهريا",

    add_to_planner: "إضافة إلى المُخطط",

    // Note Section
    note_title: "أضف ملاحظة",
    note_placeholder: "اكتب الملاحظة هنا...",

    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    am: "ص",
    pm: "م",

    finish: "إنهاء",

    // Schedule Confirmation Section
    schedule_confirmation_title: "تهانينا",
    schedule_confirmation_message: "تم جدولة الفصل !",
    share_schedule_reminder: "يمكنك دائمًا مشاركة جدولك الزمني!",
    not_now: "ليس الآن",

    // Class Scheduled Section
    class_scheduled_title: "تهانينا",
    class_scheduled_message: "تم جدولة الفصل",
    create: "يخلق",

    // Groups Section
    groups_title: "مجموعاتك",
    create_group: "يخلق",
    joined_groups_title: "المجموعات المنضمة({__})",
    joined_groups_description: "المجموعات التي انضممت إليها",
    featured_groups_title: "المجموعات المميزة",
    top_trending_study_groups_title: "أعلى مجموعات الدراسة تتجه",

    search_group_placeholder: "البحث عن مجموعة حسب الاسم",

    // Group Details Section
    group_owner_label: "مالك المجموعة",
    live_members_count: "{__} يعيش الآن",
    join_live: "انضم لايف",
    view_leaderboard: "عرض المتصدرين",
    leave_group: "غادر المجموعة",

    // Focus Mode Section
    focus_mode_title: "وضع التركيز",
    study_together: "الدراسة معًا",
    this_week: "هذا الاسبوع",
    this_month: "هذا الشهر",
    all_time: "كل الوقت",

    // Group Information Section
    group_title_label: "عنوان المجموعة",
    group_bio_label: "المجموعة الحيوية",
    add_time: "إضافة وقت",
    at_symbol: "@",

    // Timer Settings Section
    timer_settings_title: "إعدادات الموقت",
    timer_on_label: "المؤقت يعمل",

    // Account Section
    account_title: "الحساب الخاص بك",
    edit_profile: "تعديل الملف الشخصي",
    manage_account: "إدارة الحساب",
    contact_support: "اتصل بالدعم",

    // Community Section
    community_title: "مجتمع",
    faqs_title: "الأسئلة الشائعة",
    logout: "تسجيل خروج",
  },
};

export { translations };
