# step 1

npm i

# step 2

npm run start

# step 3

npm run start:db

# wordplay

The game is played by deriving a new word from the last letter of the word.

#### chair -> random -> middle -> earth -> horizon -> …

it is forbidden for the contestants to repeat the terms that have been said before, and within a certain period of time.

The chain needs to continue. Do this with JavaScript and webkit's Speech Recognition.

Develop using Speech Synthesis Utterance features.

Thanks to the microphone and speaker, the person will be able to play this game with the computer. As we mentioned, both sides

It is forbidden to use the same words again. 30% to the computer to make the game more enjoyable.

It would be great if you add word-finding randomness at the rate of.

Design doesn't matter at all here. Only the last word from which the playing user will derive the word

it should write on the screen and put a timer that shows how many seconds it should continue the chain.

will be enough.

### The flow of the game will be as follows;

- Start Game

- Request permission to use microphone

- Choose a random word for the computer and display it on the screen (Example: Javascript)

- Listen to the user's microphone and within 8 seconds expect a name starting with the letter **T**​

  - If the user has said a correct name; show the computer selected word on the screen again

  and start the timer. Here you can add a random thinking time to the computer.

  - The user has said a wrong name; show you lost the game and how many words in the chain

  show your progress

  - If the user has said a name that has already been said; show you lost the game and

  show how many words they are advancing in the chain,

- The computer may not remember 30% of the words, so the player can win the game. This

In that case show you won the game and show how many words they have advanced in the chain.

You can find the name database you will use in the form of JSON in the question.

You can add new features to this game as you wish, or you can take any step you want from the flow mentioned above.

you can take it out.

1. Example new feature: Computer difficulty. Before starting the game, the user can select the opponent's power level.

2. Example new feature: The game supports other languages. Before starting the game, the user can choose which language they want to play the game in.

3. Example new feature: Scoreboard. It can be connected to a backend and put a point system.
