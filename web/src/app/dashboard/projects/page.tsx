import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Boxes } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground">View and manage your projects</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Boxes className="size-5" />
            <div>
              <CardTitle>Project Alpha</CardTitle>
              <CardDescription>Web3 Application</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>Status: Active</p>
            <p>Deployments: 3</p>
          </CardContent>
        </Card>
        {/* Add more project cards */}
      </div>
    </div>
  )
}
