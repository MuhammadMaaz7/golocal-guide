import { CheckCircle, Clock } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export function CourseTimeline({ courses }) {
  return (
    <div className="relative">
      {courses.map((course, index) => (
        <div key={course.id} className="mb-8 flex">
          <div className="relative flex flex-col items-center">
            <div
              className={`h-4 w-4 rounded-full ${
                course.completed ? "bg-green-500" : "bg-indigo-200"
              }`}
            />
            {index < courses.length - 1 && (
              <div className="h-full w-0.5 bg-indigo-200" />
            )}
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              {course.completed ? (
                <Badge variant="success">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  {course.dueDate}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">{course.description}</p>
            <div className="mt-2">
              <div className="h-2 rounded-full bg-indigo-100">
                <div
                  className="h-2 rounded-full bg-indigo-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {course.progress}% Complete
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

