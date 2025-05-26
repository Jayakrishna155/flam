"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee, Project, Feedback } from "@/types/employee";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import RatingStars from "@/components/employees/rating-stars";

interface EmployeeTabsProps {
  employee: Employee;
}

const tabVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function EmployeeTabs({ employee }: EmployeeTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="enter"
          animate="center"
          exit="exit"
          variants={tabVariants}
          transition={{ duration: 0.2 }}
        >
          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">{employee.firstName} {employee.lastName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{employee.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{employee.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-sm text-muted-foreground">{employee.age} years</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {employee.address.address}, {employee.address.city}, {employee.address.state} {employee.address.postalCode}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Join Date</p>
                    <p className="text-sm text-muted-foreground">{employee.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department & Role</CardTitle>
                <CardDescription>Professional information</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Title</p>
                    <p className="text-sm text-muted-foreground">{employee.company.title}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Bio</p>
                  <p className="text-sm text-muted-foreground">{employee.bio}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
                <CardDescription>Past ratings and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.performance.history.map((perf, i) => (
                    <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <RatingStars rating={perf.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">{perf.date}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm">{perf.review}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employee.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-4 mt-6">
            {employee.feedback.map((item) => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const getStatusIcon = () => {
    switch (project.status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Planned":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  const getStatusColor = () => {
    switch (project.status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "Planned":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{project.name}</CardTitle>
          <Badge 
            variant="secondary"
            className={`flex items-center gap-1 ${getStatusColor()}`}
          >
            {getStatusIcon()}
            {project.status}
          </Badge>
        </div>
        <CardDescription>Role: {project.role}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <p className="text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Start: {project.startDate}
          </div>
          {project.endDate && (
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-3 w-3" />
              End: {project.endDate}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const getFeedbackColor = () => {
    switch (feedback.type) {
      case "Positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Constructive":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "Recognition":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">{feedback.from}</CardTitle>
            <CardDescription>{format(new Date(feedback.date), 'PPP')}</CardDescription>
          </div>
          <Badge 
            variant="secondary"
            className={getFeedbackColor()}
          >
            {feedback.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{feedback.message}</p>
      </CardContent>
    </Card>
  );
}