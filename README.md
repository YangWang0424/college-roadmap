
**NOTE: These steps are probably not perfect. I am not the most experienced person with GitHub.**

STARTING WORK / PULLING FROM THE REPO:
1. `cd your\directory\here`
2. `git branch`         <-- (this will display what branch you are on. You should be in the branch with your name. If not, change to it with `git checkout your_branch_name_here`)
3. `git pull origin next_release`     <-- (yes - next_release, not main. We should save main for final submissions)
4. `npm i` 	    <-- (in case anyone added any new packages or whatever)


PUSHING YOUR CHANGES:
1. `cd your\directory\here`
2. `git branch`   <-- (this will display what branch you are on. You should be in the branch with your name. If not, change to it with `git checkout your_branch_name_here`)
3. `git pull origin next_release`   <-- (in case anyone made any changes while you were working)
4. `git add .`
5. `git commit -m "your commit message here"`
6. `git push origin your_name`   	<-- you should be pushing to your branch. From there, you can request to merge your changes into next_release on GitHub


INITIAL SETUP:
To get this and run it on your computer: 

1. Open your command prompt
2. Make or choose a folder to put the project files in (you can just do this step in file explorer if you want)
3. Navigate to that folder in your command prompt. Example: `cd C:\Users\jane\College Roadmap Project`
4. Do: `git clone https://github.com/YangWang0424/college-roadmap.git`
5. The above command should clone the repository into the folder you wanted
6. To run it for the first time, navigate to the folder that it is in Example: `cd C:\Users\jane\College Roadmap Project\college-roadmap`
7. Then do: `npm install`
8. Now do: `node app.js`
9. Then, in your browser, go to the URL: localhost:8080
10. You should see the home page.

