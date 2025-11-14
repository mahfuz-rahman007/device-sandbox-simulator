Full Stack Developer Task: Device Sandbox Simulator
Objective
Create a Device Simulator Web Application that allows users to interact with and control virtual devices (Light and Fan) inside a sandbox environment.
You’ll be building a drag-and-drop interface where users can place devices into a workspace, control their settings, and save/load preset configurations.

🎨 Design Reference
You will find the design layout and expected behavior in the attached Figma mockups (and example images).

🧩 Core Requirements
1. Frontend (React)
Implement a drag-and-drop interface:


Devices (Light, Fan) appear in the left sidebar.


A “Testing Canvas” area acts as the droppable zone.


When a device is dropped:


A dynamic controller panel appears for that specific device.


Device controls:


Light:


Power ON/OFF toggle.


Color temperature selection (e.g., warm, neutral, cool, pink, etc.).


Brightness slider (0–100%).


The light’s visual representation should change in real time based on settings.


Fan:


Power ON/OFF toggle.


Speed control slider (0–100%).


The fan animation or indicator should react dynamically to speed and power.


Preset Management:


Users can save the current configuration as a preset (name input).


Saved presets appear in the sidebar.


Users can drag a preset into the canvas to restore its configuration.



2. Backend (PHP + MySQL)
Build APIs to:


Save device configurations and presets.


Retrieve and load saved presets.


Store data in a MySQL database.


Suggested Tables:


devices (id, type, name, settings JSON)


presets (id, name, devices JSON)



3. Functionality
The app should store and retrieve presets via API.


Devices and presets should remain persistent (page refresh should not lose data).


Use React Context or Redux for state management.


Use a lightweight backend framework (e.g., pure PHP or Laravel if preferred).



4. Bonus Points
Clean, responsive UI with smooth animations.


Modular React components for each device type.


Validation and error handling for API requests.


Code comments and brief README explaining your architecture.



⚙️ Tech Stack
Frontend: React (with Hooks or functional components)


Backend: PHP (Core PHP or Laravel)


Database: MySQL


Optional: Axios for API calls, Redux for state management, React DnD for drag-and-drop.



🧾 Deliverables
Source code (frontend + backend)


SQL dump for database setup


Setup instructions (README.md)
