import { Button } from '@aps/design.examples.button';
import { Card, Button as FlowbiteButton } from 'flowbite-react';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/**
 * lazy load components or routes using `React.lazy`.
 */
const HelloWorld = React.lazy(() => import('./hello-world.mdx'));

export function ViteAppApp() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col gap-2 items-center justify-center h-screen bg-gray-100">
              <h1 className="text-4xl text-center text-gray-800">
                Hello Bit and Vite!
              </h1>
              <Button>Click me</Button>

              <Card className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <FlowbiteButton>
                  Read more
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </FlowbiteButton>
              </Card>
            </div>
          }
        />
        <Route
          path="/about"
          element={
            // use suspense while loading components or modules.
            <Suspense>
              <HelloWorld />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default ViteAppApp;
