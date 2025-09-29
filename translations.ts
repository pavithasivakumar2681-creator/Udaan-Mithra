
import type { LocalizedString } from './types';

export const translations: Record<string, LocalizedString> = {
  // General
  continue: { en: 'Continue', hi: 'जारी रखें', pa: 'ਜਾਰੀ ਰੱਖੋ' },
  back: { en: 'Back', hi: 'वापस', pa: 'ਪਿੱਛੇ' },
  logout: { en: 'Logout', hi: 'लॉग आउट', pa: 'ਲੌਗ ਆਉਟ' },
  login: { en: 'Login', hi: 'लॉग इन करें', pa: 'ਲਾਗਿਨ ਕਰੋ' },
  punjabi: { en: 'Punjabi', hi: 'पंजाबी', pa: 'ਪੰਜਾਬੀ' },
  math: { en: 'Math', hi: 'गणित', pa: 'ਗਣਿਤ' },
  physics: { en: 'Physics', hi: 'भौतिक विज्ञान', pa: 'ਭੌਤਿਕ ਵਿਗਿਆਨ' },
  chemistry: { en: 'Chemistry', hi: 'रसायन विज्ञान', pa: 'ਰਸਾਇਣ ਵਿਗਿਆਨ' },
  biology: { en: 'Biology', hi: 'जीवविज्ञान', pa: 'ਜੀਵ ਵਿਗਿਆਨ' },
  computer_science: { en: 'Computer Sci.', hi: 'कंप्यूटर विज्ञान', pa: 'ਕੰਪਿਊਟਰ ਵਿਗਿਆਨ' },
  english: { en: 'English', hi: 'अंग्रेज़ी', pa: 'ਅੰਗਰੇਜ਼ੀ' },
  
  // Signup
  get_started: { en: 'Get Started with Udaan Mithra', hi: 'उड़ान मिथ्रा के साथ शुरुआत करें', pa: 'ਉਡਾਨ ਮਿੱਤਰਾ ਨਾਲ ਸ਼ੁਰੂਆਤ ਕਰੋ' },
  full_name: { en: 'Full Name', hi: 'पूरा नाम', pa: 'ਪੂਰਾ ਨਾਮ' },
  name_placeholder: { en: 'e.g. Jaspreet Kaur', hi: 'उदा. जसप्रीत कौर', pa: 'ਉਦਾ. ਜਸਪ੍ਰੀਤ ਕੌਰ' },
  email_address: { en: 'Email Address', hi: 'ईमेल पता', pa: 'ਈਮੇਲ ਪਤਾ' },
  email_address_placeholder: { en: 'you@example.com', hi: 'you@example.com', pa: 'you@example.com' },
  i_am_a: { en: 'I am a...', hi: 'मैं एक...', pa: 'ਮੈਂ ਇੱਕ...' },
  student: { en: 'Student', hi: 'विद्यार्थी', pa: 'ਵਿਦਿਆਰਥੀ' },
  teacher: { en: 'Teacher', hi: 'अध्यापक', pa: 'ਅਧਿਆਪਕ' },
  my_grade: { en: 'My Grade', hi: 'मेरी कक्षा', pa: 'ਮੇਰੀ ਜਮਾਤ' },
  class_11: { en: 'Class {grade}', hi: 'कक्षा {grade}', pa: 'ਜਮਾਤ {grade}' },
  class_12: { en: 'Class 12', hi: 'कक्षा 12', pa: 'ਜਮਾਤ 12' },
  create_account: { en: 'Create Account', hi: 'खाता बनाएं', pa: 'ਖਾਤਾ ਬਣਾਓ' },
  already_have_account: { en: 'Already have an account?', hi: 'पहले से ही एक खाता है?', pa: 'ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਖਾਤਾ ਹੈ?' },
  valid_name_error: { en: 'Please enter a valid name.', hi: 'कृपया एक मान्य नाम दर्ज करें।', pa: 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਹੀ ਨਾਮ ਦਰਜ ਕਰੋ।' },
  valid_email_error: { en: 'Please enter a valid email address.', hi: 'कृपया एक मान्य ईमेल पता दर्ज करें।', pa: 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਈਮੇਲ ਪਤਾ ਦਾਖਲ ਕਰੋ।' },
  select_subjects_teacher: { en: 'Select subjects you teach', hi: 'आप जो विषय पढ़ाते हैं उन्हें चुनें', pa: 'ਉਹ ਵਿਸ਼ੇ ਚੁਣੋ ਜੋ ਤੁਸੀਂ ਪੜ੍ਹਾਉਂਦੇ ਹੋ' },

  // Login
  welcome_back_login: { en: 'Welcome Back!', hi: 'वापसी पर स्वागत है!', pa: 'ਜੀ ਆਇਆਂ ਨੂੰ!' },
  login_to_continue: { en: 'Please log in to continue.', hi: 'कृपया जारी रखने के लिए लॉग इन करें।', pa: 'ਕਿਰਪਾ ਕਰਕੇ ਜਾਰੀ ਰੱਖਣ ਲਈ ਲੌਗਇਨ ਕਰੋ।' },
  continue_learning: { en: 'Continue Learning', hi: 'सीखना जारी रखें', pa: 'ਸਿੱਖਣਾ ਜਾਰੀ ਰੱਖੋ' },
  not_you: { en: 'Not you? Sign up with a new account', hi: 'आप नहीं? नए खाते से साइन अप करें', pa: 'ਤੁਸੀਂ ਨਹੀਂ? ਨਵੇਂ ਖਾਤੇ ਨਾਲ ਸਾਈਨ ਅੱਪ ਕਰੋ' },

  // Onboarding
  choose_subjects: { en: 'Choose your subjects', hi: 'अपने विषय चुनें', pa: 'ਆਪਣੇ ਵਿਸ਼ੇ ਚੁਣੋ' },
  change_later: { en: 'You can always change these later.', hi: 'आप इन्हें बाद में कभी भी बदल सकते हैं।', pa: 'ਤੁਸੀਂ ਇਹਨਾਂ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਬਦਲ ਸਕਦੇ ਹੋ।' },
  set_daily_goal: { en: 'Set a daily goal', hi: 'दैनिक लक्ष्य निर्धारित करें', pa: 'ਰੋਜ਼ਾਨਾ ਦਾ ਟੀਚਾ ਸੈੱਟ ਕਰੋ' },
  learning_adds_up: { en: 'Learning a little each day adds up!', hi: 'हर दिन थोड़ा-थोड़ा सीखने से बहुत कुछ जुड़ जाता है!', pa: 'ਹਰ ਰੋਜ਼ ਥੋੜ੍ਹਾ-ਥੋੜ੍ਹਾ ਸਿੱਖਣ ਨਾਲ ਬਹੁਤ ਫ਼ਰਕ ਪੈਂਦਾ ਹੈ!' },
  minutes_short: { en: 'min', hi: 'मिनट', pa: 'ਮਿੰਟ' },
  start_learning: { en: 'Start Learning!', hi: 'सीखना शुरू करें!', pa: 'ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ!' },

  // Dashboard
  welcome_back_dashboard: { en: 'Welcome back, {name}!', hi: 'वापसी पर स्वागत है, {name}!', pa: 'ਜੀ ਆਇਆਂ ਨੂੰ, {name}!' },
  continue_journey: { en: 'Let\'s continue your learning journey.', hi: 'आइए आपकी सीखने की यात्रा जारी रखें।', pa: 'ਆਓ ਆਪਣੀ ਸਿੱਖਣ ਦੀ ਯਾਤਰਾ ਜਾਰੀ ਰੱਖੀਏ।' },
  day_streak: { en: 'Day Streak', hi: 'दिन की स्ट्रीक', pa: 'ਦਿਨ ਦੀ ਸਟ੍ਰੀਕ' },
  total_xp: { en: 'Total XP', hi: 'कुल XP', pa: 'ਕੁੱਲ XP' },
  leaderboard: { en: 'Leaderboard', hi: 'लीडरबोर्ड', pa: 'ਲੀਡਰਬੋਰਡ' },
  quests: { en: 'Quests', hi: 'खोज', pa: 'ਖੋਜ' },
  complete_lessons_quest: { en: 'Complete {count} lessons', hi: '{count} पाठ पूरे करें', pa: '{count} ਪਾਠ ਪੂਰੇ ਕਰੋ' },
  achieve_streak_quest: { en: 'Achieve a {count}-day streak', hi: '{count} दिन की स्ट्रीक प्राप्त करें', pa: '{count}-ਦਿਨ ਦੀ ਸਟ੍ਰੀਕ ਪ੍ਰਾਪਤ ਕਰੋ' },
  your_subjects: { en: 'Your Subjects', hi: 'आपके विषय', pa: 'ਤੁਹਾਡੇ ਵਿਸ਼ੇ' },
  lessons_completed: { en: '{completed}/{total} lessons', hi: '{completed}/{total} पाठ', pa: '{completed}/{total} ਪਾਠ' },

  // Subject Lessons View
  lessons_for_subject: { en: '{subject} Lessons', hi: '{subject} के पाठ', pa: '{subject} ਦੇ ਪਾਠ' },
  earn_xp: { en: 'Earn {xp} XP', hi: '{xp} XP कमाएँ', pa: '{xp} XP ਕਮਾਓ' },
  start: { en: 'START', hi: 'शुरू', pa: 'ਸ਼ੁਰੂ' },

  // Lesson View
  lesson_complete: { en: 'Lesson Complete!', hi: 'पाठ पूरा हुआ!', pa: 'ਪਾਠ ਪੂਰਾ ਹੋਇਆ!' },
  great_job: { en: 'Great job on finishing "{title}".', hi: '"{title}" खत्म करने पर बहुत बढ़िया काम।', pa: '"{title}" ਨੂੰ ਪੂਰਾ ਕਰਨ \'ਤੇ ਬਹੁਤ ਵਧੀਆ ਕੰਮ।' },
  correct: { en: 'Correct!', hi: 'सही!', pa: 'ਸਹੀ!' },
  incorrect: { en: 'Incorrect!', hi: 'गलत!', pa: 'ਗਲਤ!' },
  next: { en: 'Next', hi: 'अगला', pa: 'ਅਗਲਾ' },

  // Teacher Dashboard
  teacher_dashboard: { en: 'Teacher Dashboard', hi: 'शिक्षक डैशबोर्ड', pa: 'ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ' },
  welcome_teacher: { en: 'Welcome, {name}!', hi: 'स्वागत है, {name}!', pa: 'ਜੀ ਆਇਆਂ ਨੂੰ, {name}!' },
  student_analytics: { en: 'Student Analytics', hi: 'छात्र विश्लेषण', pa: 'ਵਿਦਿਆਰਥੀ ਵਿਸ਼ਲੇਸ਼ਣ' },
  lesson_progress: { en: 'Lesson Progress', hi: 'पाठ प्रगति', pa: 'ਪਾਠ ਦੀ ਤਰੱਕੀ' },
  all_subjects: { en: 'All Subjects', hi: 'सभी विषय', pa: 'ਸਾਰੇ ਵਿਸ਼ੇ' },
  class_statistics: { en: 'Class Statistics', hi: 'कक्षा के आँकड़े', pa: 'ਜਮਾਤ ਦੇ ਅੰਕੜੇ' },
  total_students: { en: 'Total Students', hi: 'कुल छात्र', pa: 'ਕੁੱਲ ਵਿਦਿਆਰਥੀ' },
  avg_score: { en: 'Avg. Score', hi: 'औसत स्कोर', pa: 'ਔਸਤ ਸਕੋਰ' },
  active_this_week: { en: 'Active This Week', hi: 'इस सप्ताह सक्रिय', pa: 'ਇਸ ਹਫ਼ਤੇ ਸਰਗਰਮ' },
  needs_attention: { en: 'Needs Attention', hi: 'ध्यान देने की आवश्यकता है', pa: 'ਧਿਆਨ ਦੇਣ ਦੀ ਲੋੜ ਹੈ' },
  low_score_or_inactive: { en: 'Low scores or inactive for 7+ days', hi: 'कम स्कोर या 7+ दिनों से निष्क्रिय', pa: 'ਘੱਟ ਸਕੋਰ ਜਾਂ 7+ ਦਿਨਾਂ ਤੋਂ ਅਕਿਰਿਆਸ਼ੀਲ' },
  last_active: { en: 'Last active: {date}', hi: 'अंतिम सक्रिय: {date}', pa: 'ਆਖਰੀ ਵਾਰ ਸਰਗਰਮ: {date}' },
  avg_score_percent: { en: 'Avg: {score}%', hi: 'औसत: {score}%', pa: 'ਔਸਤ: {score}%' },
};
