import { Button, Card } from "@hyunu/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Hyunu's Blog
          </h1>
          <p className="text-xl text-gray-600">
            A modern blog built with Next.js and a monorepo architecture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Monorepo Structure"
            footer={
              <Button variant="primary" size="sm">
                Learn More
              </Button>
            }
          >
            <p className="text-gray-600">
              This blog is built using a monorepo structure with shared packages
              and multiple applications.
            </p>
          </Card>

          <Card
            title="Shared Components"
            footer={
              <Button variant="secondary" size="sm">
                View Components
              </Button>
            }
          >
            <p className="text-gray-600">
              Reusable UI components are shared across all apps in the workspace
              through the @hyunu/ui package.
            </p>
          </Card>

          <Card
            title="TypeScript Configuration"
            footer={
              <Button variant="outline" size="sm">
                Documentation
              </Button>
            }
          >
            <p className="text-gray-600">
              Centralized TypeScript configurations ensure consistency across
              all packages and applications.
            </p>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Get Started
          </h2>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg">
              Start Writing
            </Button>
            <Button variant="outline" size="lg">
              View Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
