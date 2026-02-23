/**
 * DUCERE AI Engine
 * Rule-based + statistical AI for burnout prediction, curriculum generation,
 * skill gap analysis, and feedback sentiment analysis.
 * Designed to be model-agnostic — swap rule logic for LLM calls when ready.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WellnessInputs {
    stress: number;         // 1-10
    mood: number;           // 1-10
    sleepHours: number;     // 0-12
    studyHours: number;     // 0-16
    daysOfData?: number;    // how many days averaged
}

export interface BurnoutResult {
    score: number;          // 0-100
    risk: 'low' | 'moderate' | 'high';
    label: string;
    suggestions: string[];
}

export interface StudyTask {
    id: string;
    subject: string;
    type: 'theory' | 'practice' | 'project' | 'revision' | 'mock-test';
    duration: number;       // minutes
    day: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}

export interface StudyPlanResult {
    weekLabel: string;
    tasks: StudyTask[];
    intensityLevel: 'light' | 'moderate' | 'intensive';
    focusTip: string;
}

export interface SkillGapResult {
    missingSkills: string[];
    presentSkills: string[];
    recommendations: string[];
    roadmap: RoadmapStep[];
}

export interface RoadmapStep {
    week: number;
    skill: string;
    resource: string;
    type: 'course' | 'project' | 'practice' | 'certification';
}

// ─── Burnout Prediction ───────────────────────────────────────────────────────

export function predictBurnout(inputs: WellnessInputs): BurnoutResult {
    const stressScore = (inputs.stress / 10) * 40;
    const sleepScore = inputs.sleepHours < 6 ? 30 : inputs.sleepHours < 7 ? 15 : 0;
    const studyScore = inputs.studyHours > 10 ? 20 : inputs.studyHours > 8 ? 10 : 0;
    const moodScore = ((10 - inputs.mood) / 10) * 10;
    const raw = stressScore + sleepScore + studyScore + moodScore;
    const score = Math.min(100, Math.round(raw));

    const risk: 'low' | 'moderate' | 'high' =
        score < 35 ? 'low' : score < 65 ? 'moderate' : 'high';

    const suggestions: Record<string, string[]> = {
        low: [
            'Keep up your good habits! Maintain 7-8 hours of sleep.',
            'Try a 10-minute mindfulness session to stay sharp.',
            'Your current pace is sustainable — great work!',
        ],
        moderate: [
            'Consider reducing study hours by 1-2 hours/day.',
            'Take a 30-minute break every 90 minutes of study.',
            'Practice deep breathing to lower stress.',
            'Speak with your mentor about workload adjustment.',
        ],
        high: [
            '🚨 High burnout risk detected! Please reduce workload immediately.',
            'Take at least 1 rest day this week.',
            'Reach out to your mentor or counselor today.',
            'Sleep 8+ hours for the next 3 days.',
            'Avoid mock tests until your stress drops below 5.',
        ],
    };

    const labels = {
        low: 'Low Risk – You\'re on track',
        moderate: 'Moderate Risk – Monitor closely',
        high: 'High Risk – Rest is priority',
    };

    return { score, risk, label: labels[risk], suggestions: suggestions[risk] };
}

// ─── Study Plan Generation ────────────────────────────────────────────────────

const SUBJECTS_BY_NICHE: Record<string, string[]> = {
    'Software Engineering': ['Data Structures', 'Algorithms', 'System Design', 'React', 'Node.js', 'Database Design'],
    'Data Science': ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL', 'Deep Learning'],
    'UI/UX Design': ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility', 'CSS Advanced'],
    'DevOps': ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP', 'Monitoring'],
    'Cybersecurity': ['Networking Basics', 'Ethical Hacking', 'Cryptography', 'OWASP', 'Incident Response', 'Cloud Security'],
    'Product Management': ['Market Research', 'Agile/Scrum', 'User Stories', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
    'Finance': ['Financial Modeling', 'Excel Advanced', 'Accounting Basics', 'Valuation', 'Risk Management', 'Bloomberg Terminal'],
    'General': ['Core Subject A', 'Core Subject B', 'Communication Skills', 'Aptitude', 'Mock Tests', 'Project Work'],
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function generateStudyPlan(
    niche: string,
    burnoutScore: number,
    performanceScore: number,
): StudyPlanResult {
    const subjects = SUBJECTS_BY_NICHE[niche] || SUBJECTS_BY_NICHE['General'];
    const intensity = burnoutScore > 60 ? 'light' : burnoutScore > 30 ? 'moderate' : 'intensive';
    const hoursPerDay = intensity === 'light' ? 3 : intensity === 'moderate' ? 5 : 7;

    const tasks: StudyTask[] = [];
    let taskCounter = 0;

    DAYS.forEach((day, idx) => {
        if (intensity === 'light' && idx >= 5) return;
        const isWeekend = idx >= 5;
        const todayHours = isWeekend ? Math.max(1, hoursPerDay - 2) : hoursPerDay;
        const taskCount = Math.max(1, Math.floor(todayHours / 1.5));

        for (let i = 0; i < taskCount; i++) {
            const subject = subjects[(taskCounter + i) % subjects.length];
            const type: StudyTask['type'] = i === 0 ? 'theory' : i === 1 ? 'practice' : isWeekend ? 'revision' : 'project';
            const priority: StudyTask['priority'] = performanceScore < 50 ? 'high' : 'medium';
            tasks.push({
                id: `task-${taskCounter + i + 1}`,
                subject,
                type,
                duration: type === 'mock-test' ? 180 : type === 'theory' ? 60 : 90,
                day,
                priority,
                completed: false,
            });
        }
        taskCounter += taskCount;
    });

    const focusTips: Record<string, string> = {
        light: 'Focus on quality over quantity. Short, focused sessions with adequate rest.',
        moderate: 'Use the Pomodoro technique: 25 min study + 5 min break.',
        intensive: 'Your performance calls for deep work. Block distractions completely.',
    };

    return {
        weekLabel: `Week of ${new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`,
        tasks,
        intensityLevel: intensity,
        focusTip: focusTips[intensity],
    };
}

// ─── Skill Gap Analysis ───────────────────────────────────────────────────────

const ROLE_REQUIREMENTS: Record<string, string[]> = {
    'Frontend Developer': ['React', 'TypeScript', 'CSS', 'HTML', 'Git', 'Responsive Design', 'REST APIs'],
    'Backend Developer': ['Node.js', 'SQL', 'REST APIs', 'Authentication', 'Docker', 'Testing', 'Git'],
    'Full Stack Developer': ['React', 'Node.js', 'MongoDB/PostgreSQL', 'TypeScript', 'Docker', 'Git', 'REST APIs'],
    'Data Scientist': ['Python', 'Machine Learning', 'Statistics', 'Pandas', 'SQL', 'Visualization', 'Deep Learning'],
    'DevOps Engineer': ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform', 'Monitoring'],
    'UX Designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
    'Product Manager': ['Agile', 'User Stories', 'Data Analysis', 'Communication', 'Roadmapping', 'Stakeholder Management'],
    'Cybersecurity Analyst': ['Networking', 'SIEM', 'Vulnerability Assessment', 'Python', 'OWASP', 'Incident Response'],
};

const RESOURCE_MAP: Record<string, string> = {
    'React': 'React Official Docs + Scrimba React Course',
    'TypeScript': 'TypeScript Handbook (typescriptlang.org)',
    'Node.js': 'Node.js Official Docs + The Odin Project',
    'Python': 'Python.org Tutorial + Kaggle Learn',
    'Machine Learning': 'fast.ai Practical Deep Learning',
    'Docker': 'Docker Getting Started Guide',
    'Kubernetes': 'Kubernetes.io Interactive Tutorial',
    'AWS': 'AWS Skill Builder Free Tier',
    'SQL': 'Mode Analytics SQL Tutorial',
    'Figma': 'Figma Community + DesignCourse YouTube',
    'default': 'Search on Coursera, Udemy, or YouTube',
};

export function analyzeSkillGap(
    role: string,
    userSkills: string[],
): SkillGapResult {
    const required = ROLE_REQUIREMENTS[role] || [];
    const userSkillsLower = userSkills.map((s) => s.toLowerCase());
    const presentSkills = required.filter((r) => userSkillsLower.some((u) => u.includes(r.toLowerCase())));
    const missingSkills = required.filter((r) => !userSkillsLower.some((u) => u.includes(r.toLowerCase())));

    const roadmap: RoadmapStep[] = missingSkills.map((skill, idx) => ({
        week: idx + 1,
        skill,
        resource: RESOURCE_MAP[skill] || RESOURCE_MAP['default'],
        type: idx === missingSkills.length - 1 ? 'certification' : idx % 2 === 0 ? 'course' : 'project',
    }));

    const recommendations = [
        `Focus on ${missingSkills.slice(0, 2).join(' and ')} first — highest demand for ${role}.`,
        'Build 2-3 portfolio projects demonstrating your skills.',
        'Contribute to open source to show real-world experience.',
        `Complete a ${role}-specific certification within 3 months.`,
    ];

    return { missingSkills, presentSkills, recommendations, roadmap };
}

// ─── Feedback Analysis ────────────────────────────────────────────────────────

export interface FeedbackAnalysis {
    sentiment: 'positive' | 'neutral' | 'negative';
    keyThemes: string[];
    recommendations: string[];
    confidenceScore: number;
}

const STRESS_KEYWORDS = ['overwhelmed', 'stressed', 'anxious', 'too much', 'burnout', 'tired', 'exhausted', 'difficult'];
const POSITIVE_KEYWORDS = ['great', 'good', 'excellent', 'improving', 'confident', 'enjoying', 'productive', 'motivated'];
const DIFFICULTY_KEYWORDS = ['hard', 'confusing', 'unclear', 'struggling', 'difficult', 'complex', 'lost'];

export function analyzeFeedback(text: string, satisfactionScore: number): FeedbackAnalysis {
    const lower = text.toLowerCase();
    const stressHits = STRESS_KEYWORDS.filter((k) => lower.includes(k)).length;
    const positiveHits = POSITIVE_KEYWORDS.filter((k) => lower.includes(k)).length;
    const difficultyHits = DIFFICULTY_KEYWORDS.filter((k) => lower.includes(k)).length;

    const sentiment: 'positive' | 'neutral' | 'negative' =
        satisfactionScore >= 7 && positiveHits > stressHits
            ? 'positive'
            : satisfactionScore <= 4 || stressHits > positiveHits
                ? 'negative'
                : 'neutral';

    const keyThemes: string[] = [];
    if (stressHits > 0) keyThemes.push('Stress & Anxiety');
    if (difficultyHits > 0) keyThemes.push('Content Difficulty');
    if (positiveHits > 0) keyThemes.push('Positive Progress');
    if (lower.includes('mentor') || lower.includes('support')) keyThemes.push('Mentor Support');
    if (keyThemes.length === 0) keyThemes.push('General Feedback');

    const recommendations =
        sentiment === 'negative'
            ? ['Consider a mentor session this week.', 'Reduce study intensity temporarily.', 'Practice stress-relief exercises daily.']
            : sentiment === 'neutral'
                ? ['Stay consistent — small improvements add up.', 'Set 1 clear goal for next week.']
                : ['Excellent momentum! Challenge yourself with an advanced topic.', 'Consider mentoring a peer to solidify your knowledge.'];

    return {
        sentiment,
        keyThemes,
        recommendations,
        confidenceScore: Math.round(((positiveHits + stressHits + difficultyHits) / (text.split(' ').length / 10)) * 100) / 100,
    };
}
