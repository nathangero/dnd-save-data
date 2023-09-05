# D&D Save Data
A website that lets you create and edit D&D characters.  
A passion project created because I wanted to make playing D&D with friends hopefully a little easier, and more convenient to edit and read our character sheets.

This is based off the official Dungeons & Dragons 5e handbook, and character sheet seen below: (taken from Reddit)  
https://drive.google.com/file/d/1E40Eh4LoInR2-7i9XpnYnOrB3spClNRv/view 

## Website: 
https://dnd-save-data.web.app

## My Stack:
- **Vue.js**
- **Firebase**
    - Authentication
    - Realtime Database

## Why this stack?
- **Vue.js** 
    - I took a web dev class in college and the professor used Vue.js. I remember liking it, and when I was looking at other options, those didn't seem to fit my needs. This is a very simple website.
- **Firebase** 
    - I've had experience using Firebase at work and I really like how many features Firebase uses. Not to mention a lot is free to use! Having this service take care of authentication and have a database setup is great. 
    - I use the Realtime Database instead of Firestore because of again my work experience. Realtime database is easier for me to understand, look at, and use. I've had experience with designing a NoSQL database structure already so I just used what I learned in this project.

## Why even make this??
I made this because when I started a D&D campaign with some friends and when I filled out the paper character sheet, I was wondering if an online version was available. When I looked at things on the iOS App Store, I didn't like how it functioned or looked. So, I decided to make my own! At my first session, I wasn't really into the whole "erase and write" in pencil because that gets messy. I also noticed that my friends and I struggled to really find things on our chracter sheets like our Feats, Stat Mods, Weapon calculations, etc. So, I wanted to make something that is hopefully more streamlined, and does all the calculations for you automatically! (more under the section [What problem I solved](#what-problem-i-solved))  

I also wanted to take this opportunity to learn things outside of work: web dev, Vue.js, Firebase integration with web dev, Github Actions, database design, etc.

## UI design decisions
- I mainly made this for mobile devices. It does work on a desktop browser of course, but it'll probably look too small and oddly spaced out. That's something I would like to change in the future (see [Future plans](#future-plans)). Why mobile? because that's what's in my pocket every single day, and in the pockets/purses of my friends. So, that's why everything is just a tap and a scroll away like it's social media.  
- One thing I've learned about mobile dev from work, is trying to get everything to fit concisely yet not misleading on a small screen. That's why character info and stats are line by line to ensure readibility and a simple looking UI. To go along with this, I know every single major mobile app uses a bottom tab bar to navigate through the app, and a side menu for settings. Even the app I use for work has that functionality and it's snappy and clear where you are.
- I've tried to organize the order of things based upon their groups. So, Equipment and Weapons are very similar so I thought they should go together. I'm open to reorganization of course.
- This project is **heavily** inspired by save data UI/UX in video games, if the name of this project wasn't obvious enough. I tried to copy the look of how save data is presented in video games, and the functionality of being able to make manual backups, and even loading data from those backups. To be honest, the design of the character boxes under the Character tab is from Undertale. That's the image in my head that I had when making that UI.
- I used checkboxes to mark Proficiency in a Saving Throw or Skill because it's the only thing that resembled the little circles in the character sheet. 

## Coding design decisions
- I'm really proud of the way I use v-for to print out the Ability Scores, Saving Throws, and Skills sections. I had the idea after discovering how to use const dictionaries/objects (my makeshift enums for Javascript), for v-for to print out something. I know it requires perfect parity for order from the database key names to just the names the user sees on their device, but I think it was worth it. It made the coding a lot simpler to read and edit for me.
- I like enums. I use them all the time at work so it's just second nature to me to use them, especially for database keys/paths. Having a database key written down once and just use its reference everywhere else is SO convenient. Not to mention it makes refactoring a breeze!


## What problem I solved
Aside from having a protable character sheet and hopefully removing the need to use pencil and eraser again, *I really wanted to have everything calculated for me.*  
My friends and I are brand new D&D players as of the creation of this project, and our DM is so so patient with us in figuring out how dice rolls work in any situation, and how our skills work in and outside of battle. So, I had the thought of just having everything calculated based off of the Ability Scores like Strength, Dexterity, Constitution, etc. I think it worked out pretty well! Assuming all the math is correct, nothing that's based off of a Stat Modifier should ever need to be manually updated by the user. It should all be calculated automatically anytime the ability scores like Strength and Dexterity are changed.

## Future plans
- Integrate Firebase Remote Config
- Desktop compatibility
- Dark mode compatibility
- Create/Join a campaign
    - Able to view all your party's characters in the campaign
- Last session notes
- Maybe integrate some API to get descriptions for Equipment, Feats, Traits, etc.?

## Additional Resources
* https://github.com/ivanvermeyen/vue-collapse-transition (collapsible vue component)
* https://icons8.com/icon/104704/dungeons-and-dragons (site favicon)
* https://fontawesome.com/docs/web/use-with/vue/ (Font Awesome)
