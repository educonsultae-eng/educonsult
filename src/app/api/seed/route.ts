import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Service from '@/models/Service';
import Settings from '@/models/Settings';
import TeamMember from '@/models/TeamMember';
import BlogPost from '@/models/BlogPost';
import { apiError, createSlug } from '@/lib/utils';

const SEED_KEY = process.env.SEED_KEY ?? 'seed-edu-2024';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('key') !== SEED_KEY) return apiError('Forbidden', 403);

  await connectDB();

  // Admin user
  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL ?? 'admin@educonsult.ae' });
  if (!existing) {
    await User.create({
      name:     'Admin',
      email:    process.env.ADMIN_EMAIL ?? 'admin@educonsult.ae',
      password: process.env.ADMIN_PASSWORD ?? 'Admin@2024!',
      role:     'super_admin',
    });
  }

  // Settings
  const settingsExist = await Settings.findOne();
  if (!settingsExist) await Settings.create({});

  // Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    const services = [
      {
        title: 'School Improvement & KHDA Preparation',
        excerpt: 'Comprehensive support to achieve Outstanding KHDA ratings through strategic improvement plans.',
        description: 'Our expert team provides end-to-end support for KHDA inspection preparation, helping schools achieve Outstanding ratings through data-driven improvement strategies, staff development, and quality assurance frameworks.',
        icon: 'Award',
        features: ['KHDA framework alignment', 'Mock inspections', 'Action planning', 'SDP development', 'Governor training'],
        order: 1,
      },
      {
        title: 'Curriculum Development',
        excerpt: 'Expert curriculum design and development for all subjects aligned with UAE national standards.',
        description: 'We develop robust, engaging curricula across all subject areas—Mathematics, Science, English, Arabic, and Islamic Studies—aligned with ADEK, KHDA, and international frameworks.',
        icon: 'BookOpen',
        features: ['Scheme of work design', 'Assessment frameworks', 'Cross-curricular links', 'Resource development', 'Teacher guides'],
        order: 2,
      },
      {
        title: 'Leadership & Management Consulting',
        excerpt: 'Building exceptional school leaders through coaching, mentoring and strategic development.',
        description: 'We partner with principals, vice-principals and senior leaders to build leadership capacity, improve school culture, and drive sustainable improvement across all aspects of school life.',
        icon: 'Users',
        features: ['Executive coaching', 'Leadership audits', 'Performance management', 'Succession planning', 'Culture transformation'],
        order: 3,
      },
      {
        title: 'Innovation & AI in Education',
        excerpt: 'Future-proofing schools with cutting-edge EdTech, AI integration and innovation strategies.',
        description: 'We help schools harness the power of artificial intelligence and educational technology to personalise learning, reduce teacher workload and prepare students for the future economy.',
        icon: 'Cpu',
        features: ['AI literacy programmes', 'EdTech integration', 'Digital transformation', 'Innovation labs', 'Future-skills curriculum'],
        order: 4,
      },
      {
        title: 'Student Wellbeing & Pastoral Care',
        excerpt: 'Holistic wellbeing strategies that create safe, nurturing environments for every learner.',
        description: 'Our wellbeing specialists design and implement evidence-based pastoral frameworks that improve student mental health, engagement, and overall school community culture.',
        icon: 'Heart',
        features: ['Wellbeing audits', 'PSHE curriculum', 'Safeguarding frameworks', 'Counselling support', 'Parent engagement'],
        order: 5,
      },
      {
        title: 'Teacher Training & CPD',
        excerpt: 'Transformative professional development programmes that elevate teaching quality.',
        description: 'We deliver high-impact continuous professional development tailored to your school\'s improvement priorities, from early-career teacher support to middle-leader development.',
        icon: 'GraduationCap',
        features: ['Bespoke CPD design', 'Coaching cycles', 'Lesson study', 'Subject-specialist training', 'Online & blended learning'],
        order: 6,
      },
    ];

    for (const s of services) {
      await Service.create({ ...s, slug: createSlug(s.title) });
    }
  }

  // Team
  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    await TeamMember.insertMany([
      {
        name: 'Dr. Sarah Al-Mansouri',
        role: 'Founder & CEO',
        bio: 'Former KHDA school inspector with over 20 years of experience in education leadership across the GCC. Dr. Sarah founded EduConsult with a vision to elevate every school in the region.',
        order: 1,
      },
      {
        name: 'Prof. James Whitfield',
        role: 'Director of Curriculum',
        bio: 'Cambridge-trained curriculum specialist with extensive experience designing internationally benchmarked programmes for IB, British, and UAE national curriculum schools.',
        order: 2,
      },
      {
        name: 'Noura Al-Hashemi',
        role: 'Head of Leadership Development',
        bio: 'Leadership coach and former principal with 15 years of experience transforming school cultures and building high-performing leadership teams across Dubai and Abu Dhabi.',
        order: 3,
      },
      {
        name: 'Dr. Ahmed Khalil',
        role: 'Senior Education Consultant',
        bio: 'Specialist in Arabic and Islamic Studies curriculum with deep expertise in ADEK and MOE regulatory frameworks. Trusted advisor to over 50 schools across the UAE.',
        order: 4,
      },
    ]);
  }

  // Blog posts
  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany([
      {
        title: 'How to Achieve an Outstanding KHDA Rating in 2024',
        slug: 'how-to-achieve-outstanding-khda-rating-2024',
        excerpt: 'A strategic guide for school leaders on the key areas KHDA inspectors focus on and how to demonstrate excellence across all domains.',
        content: '<h2>Understanding the KHDA Framework</h2><p>The KHDA inspection framework evaluates schools across five core domains: Students\' Achievement, Students\' Personal and Social Development, Teaching and Learning, Curriculum, and Leadership and Management...</p>',
        author: 'Dr. Sarah Al-Mansouri',
        tags: ['khda', 'school improvement', 'dubai'],
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: 'AI in GCC Schools: Opportunities and Practical Steps',
        slug: 'ai-in-gcc-schools-opportunities-and-practical-steps',
        excerpt: 'How school leaders can responsibly integrate artificial intelligence tools to enhance learning outcomes and reduce teacher workload.',
        content: '<h2>The AI Revolution in Education</h2><p>Artificial intelligence is rapidly transforming classrooms across the globe, and GCC schools are uniquely positioned to lead this change in the region...</p>',
        author: 'Prof. James Whitfield',
        tags: ['ai', 'innovation', 'future of education'],
        isPublished: true,
        publishedAt: new Date(),
      },
    ]);
  }

  return Response.json({ message: 'Database seeded successfully' });
}
