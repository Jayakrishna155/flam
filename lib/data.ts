import { Employee, Department, Performance, Project, Feedback, DummyJsonUser } from "@/types/employee";

const departments: Department[] = [
  "Engineering",
  "Marketing",
  "Finance",
  "Human Resources",
  "Sales",
  "Product",
  "Design",
  "Operations",
];

const projectNames = [
  "Website Redesign",
  "Mobile App Development",
  "Cloud Migration",
  "Customer Portal",
  "Data Analytics Platform",
  "Internal Dashboard",
  "Security Audit",
  "Performance Optimization",
  "Social Media Campaign",
  "Product Launch",
];

const feedbackTypes = ["Positive", "Constructive", "Recognition"] as const;

const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const generateRandomRating = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

const generateRandomPerformanceHistory = (count: number): Performance[] => {
  const history: Performance[] = [];
  const reviews = [
    "Exceeds expectations in all areas.",
    "Consistently delivers high-quality work.",
    "Meets most expectations with some areas for improvement.",
    "Shows dedication and commitment to projects.",
    "Demonstrates strong problem-solving skills.",
    "Communication skills need improvement.",
    "Excellent team player.",
    "Takes initiative on challenging tasks.",
    "Needs more focus on meeting deadlines.",
    "Shows great potential for growth.",
  ];
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 3);
  
  for (let i = 0; i < count; i++) {
    history.push({
      rating: generateRandomRating(),
      review: reviews[Math.floor(Math.random() * reviews.length)],
      date: generateRandomDate(startDate, endDate),
    });
  }
  
  return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateRandomProjects = (count: number): Project[] => {
  const projects: Project[] = [];
  const statuses = ["Completed", "In Progress", "Planned"] as const;
  const roles = ["Lead", "Contributor", "Manager", "Consultant", "Coordinator"];
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 3);
  
  for (let i = 0; i < count; i++) {
    const projectStartDate = generateRandomDate(startDate, endDate);
    const projectEndDate = Math.random() > 0.3 
      ? generateRandomDate(new Date(projectStartDate), endDate) 
      : undefined;
    const status = projectEndDate ? "Completed" : (Math.random() > 0.5 ? "In Progress" : "Planned");
    
    projects.push({
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      status: status as typeof statuses[number],
      role: roles[Math.floor(Math.random() * roles.length)],
      description: "Project focused on improving business outcomes through strategic implementation.",
      startDate: projectStartDate,
      endDate: projectEndDate,
    });
  }
  
  return projects;
};

const generateRandomFeedback = (count: number): Feedback[] => {
  const feedback: Feedback[] = [];
  const names = [
    "John Smith",
    "Emily Johnson",
    "Michael Chen",
    "Sarah Williams",
    "David Rodriguez",
    "Jessica Thompson",
    "Robert Kim",
    "Amanda Davis",
    "Christopher Wilson",
    "Samantha Lee",
  ];
  
  const messages = [
    "Excellent collaboration skills and technical knowledge.",
    "Always willing to help team members and contribute to projects.",
    "Should focus more on documentation and knowledge sharing.",
    "Great leadership during the recent project crisis.",
    "Needs to improve time management and meeting deadlines.",
    "Outstanding problem-solving abilities.",
    "Communication with stakeholders could be improved.",
    "Demonstrates exceptional attention to detail.",
    "Has been instrumental in team success this quarter.",
    "Shows great potential for taking on more responsibilities.",
  ];
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  
  for (let i = 0; i < count; i++) {
    feedback.push({
      id: i + 1,
      from: names[Math.floor(Math.random() * names.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      date: generateRandomDate(startDate, endDate),
      type: feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)],
    });
  }
  
  return feedback.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const enrichEmployeeData = (user: DummyJsonUser): Employee => {
  const department = departments[Math.floor(Math.random() * departments.length)];
  const performanceRating = generateRandomRating();
  const performanceHistory = generateRandomPerformanceHistory(Math.floor(Math.random() * 5) + 3);
  const projects = generateRandomProjects(Math.floor(Math.random() * 6) + 2);
  const feedback = generateRandomFeedback(Math.floor(Math.random() * 8) + 3);
  
  // Generate join date between 1-5 years ago
  const now = new Date();
  const joinDate = new Date();
  joinDate.setFullYear(now.getFullYear() - Math.floor(Math.random() * 5) - 1);
  
  const bios = [
    `${user.firstName} has been a valued member of the ${department} team since joining. With a focus on collaboration and innovation, they have contributed to numerous successful projects.`,
    `As a dedicated professional in the ${department} department, ${user.firstName} brings expertise and enthusiasm to every project they undertake.`,
    `${user.firstName} joined the ${department} team with previous experience in the industry. Their insights and dedication have been valuable assets to the team.`,
    `A key member of the ${department} department, ${user.firstName} has demonstrated consistent growth and adaptability throughout their tenure.`,
  ];
  
  return {
    ...user,
    department,
    performance: {
      current: performanceRating,
      history: performanceHistory,
    },
    projects,
    feedback,
    bio: bios[Math.floor(Math.random() * bios.length)],
    joinDate: joinDate.toISOString().split('T')[0],
  };
};

export const getDepartmentAnalytics = (employees: Employee[]) => {
  const departmentData: Record<Department, { count: number, totalRating: number, avgRating: number }> = {} as any;
  
  // Initialize department data
  departments.forEach(dept => {
    departmentData[dept] = { count: 0, totalRating: 0, avgRating: 0 };
  });
  
  // Calculate totals
  employees.forEach(emp => {
    departmentData[emp.department].count += 1;
    departmentData[emp.department].totalRating += emp.performance.current;
  });
  
  // Calculate averages
  departments.forEach(dept => {
    if (departmentData[dept].count > 0) {
      departmentData[dept].avgRating = 
        parseFloat((departmentData[dept].totalRating / departmentData[dept].count).toFixed(2));
    }
  });
  
  return departmentData;
};

export const generateBookmarkTrends = () => {
  // Mock data for bookmark trends over the last 6 months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const departmentTrends: Record<string, number[]> = {};
  
  departments.forEach(dept => {
    departmentTrends[dept] = months.map(() => Math.floor(Math.random() * 10) + 1);
  });
  
  return {
    labels: months,
    datasets: departments.map((dept, index) => ({
      label: dept,
      data: departmentTrends[dept],
    })),
  };
};