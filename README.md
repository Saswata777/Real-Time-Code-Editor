
````
# Real Time Code Editor

A real-time collaborative code editor built with a **React (Vite/TypeScript)** frontend and a **Python (FastAPI)** backend.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [Python](https://www.python.org/) (v3.8 or higher)
* Git

---

## 🚀 Setup Instructions

To run this project, you will need to open **two separate terminals**: one for the backend server and one for the frontend client.

### 1. Clone the Repository

```bash
git clone [https://github.com/Saswata777/Real-Time-Code-Editor.git](https://github.com/Saswata777/Real-Time-Code-Editor.git)
cd Real-Time-Code-Editor
````

### 2\. Backend Setup (Python)

Open your **first terminal** and follow these steps to set up the server:

1.  **Navigate to the project root** (if you aren't there already).

2.  **Create a virtual environment** (named `myenv`):

    ```bash
    python -m venv myenv
    ```

3.  **Activate the virtual environment**:

      * **Windows (PowerShell):**
        ```powershell
        .\myenv\Scripts\activate
        ```
      * **Mac/Linux:**
        ```bash
        source myenv/bin/activate
        ```

4.  **Install dependencies**:

    ```bash
    pip install -r backend/requirements.txt
    ```

5.  **Run the Server**:
    *(Make sure you are in the root folder)*

    ```bash
    # Runs the FastAPI server
    uvicorn backend.app.main:app --reload
    ```

    *The server should now be running on `http://localhost:8000`.*

-----

### 3\. Frontend Setup (React + Vite)

Open your **second terminal** and follow these steps:

1.  **Navigate to the frontend folder**:

    ```bash
    cd frontend
    ```

2.  **Install Node dependencies**:

    ```bash
    npm install
    ```

3.  **Start the Development Server**:

    ```bash
    npm run dev
    ```

    *The frontend should now be running on `http://localhost:5173`.*

-----

## 📂 Project Structure

```text
REAL TIME CODE EDITOR/
├── backend/
│   ├── app/                # FastAPI application code
│   ├── codecollab.db       # SQLite Database (Ignored by Git)
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
├── myenv/                  # Python Virtual Environment (Ignored by Git)
└── README.md
```

## 🛠️ Tech Stack

  * **Frontend:** React, TypeScript, Vite, Chakra UI
  * **Backend:** Python, FastAPI, WebSockets
  * **Database:** SQLite

<!-- end list -->

```
```
