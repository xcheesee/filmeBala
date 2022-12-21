interface Comment {
    author: String;
    avPhoto: string,
    likes: Number;
    dislikes: Number;
    text: String;
}

interface FilmeShowcase {
    id: Number;
    photo: string;
    name: String;
    mainRating: Number;

}

interface FilmeInfo extends FilmeShowcase {
    rtRating: Number,
    description: String,
    comments?: Comment[]
}

const moviesComms: Comment[][] = [
    [
        {
            author: "Lucas",
            avPhoto: "../../public/user-64.png",
            likes: 10,
            dislikes: 2,
            text: "One of the movies ever made"
        },
        {
            author: "Fernando",
            avPhoto: "../../public/user-64.png",
            likes: 0,
            dislikes: 69,
            text: "Horrivel"
        }
    ],
    [],
    [
        {
            author: "Lucas",
            avPhoto: "../../public/user-64.png",
            likes: 999,
            dislikes: 0,
            text: "That boy aint right"
        },
        {
            author: "Dr. Mantis Toboggan",
            avPhoto: "../../public/user-64.png",
            likes: 0,
            dislikes: 0,
            text: "You've got the HIV! Yes, AIDS, big time! You've got the AIDS, big time!"
        }
    ]
]

const showcaseDb: FilmeShowcase[] = [
    {
        id: 0,
        photo: "https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        name: "Good Will Hunting",
        mainRating: 5
    },
    {
        id: 1,
        photo: "",
        name: "The Shawshank Redemption",
        mainRating: 4.9
    },
    {
        id: 2,
        photo: "",
        name: "Forrest Gump",
        mainRating: 4.5
    }
]

const filmeDb: FilmeInfo[] = [
    {
        id: 0,
        photo: "",
        name: "Good Will Hunting",
        mainRating: 5,
        rtRating: 5,
        description: "Will Hunting (Matt Damon) has a genius-level IQ but chooses to work as a janitor at MIT. When he solves a difficult graduate-level math problem, his talents are discovered by Professor Gerald Lambeau (Stellan Skarsgard), who decides to help the misguided youth reach his potential. When Will is arrested for attacking a police officer, Professor Lambeau makes a deal to get leniency for him if he will get treatment from therapist Sean Maguire (Robin Williams).",
        comments: moviesComms[0]
    },
    {
        id: 1,
        photo: "",
        name: "The Shawshank Redemption",
        mainRating: 4.9,
        rtRating: 4.6,
        description: "That man killed wis wife", 
    },
    {
        id: 2,
        photo: "",
        name: "Forrest Gump",
        mainRating: 4.5,
        rtRating: 5,
        description: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
        comments: moviesComms[2]
    }
]



export { showcaseDb, moviesComms, filmeDb }