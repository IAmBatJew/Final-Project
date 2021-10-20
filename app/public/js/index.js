const Offer = {
    data() {
        return {
            "referee": [],
            selectedRef: null,
            selectedGame: null,
            gameForm:{},
            refForm:{},
            "games": [],
            "assignments":[]
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },

    methods: {

        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },

        postRef(evt) {
            if(this.selectedRef === null) {
                this.postNewRef(evt);
            } else {
                this.postEditRef(evt);
            }
        },

        selectRef(ref) {
            if (ref == this.selectedRef) {
                return;
            }
            this.selectedRef = ref;
            this.assignments = [];
            this.fetchAssignmentData(this.selectedRef);
        },

        postGame(evt) {
            if(this.selectedGame === null) {
                this.postNewGame(evt);
            } else {
                this.postEditGame(evt);
            }
        },

        fetchRefereeData(){
            fetch('/api/referees/')
        
            .then( response => response.json())
    
            .then( (responseJson) => {
                console.log(responseJson);
                this.referee = responseJson;
            }
            )
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        fetchGameData(){
            fetch('/api/games/')
        
            .then( response => response.json())
    
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            }
            )
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        fetchAssignmentData(ref){
            console.log("Fetching assignment data for ", ref);
            fetch('/api/assignment/?referee_id=' + ref.referee_id)
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        postNewGame(evt) {

            ///this.gameForm.game_id = this.selectedGame.game_id;
            console.log("Creating:", this.gameForm);
            // alert("Posting!");
    
            fetch('api/games/create.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.games = json;
    
                //Reset the form
                this.gameForm = {};
            });
        },

        postNewRef(evt) {

            ///this.gameForm.game_id = this.selectedGame.game_id;
            console.log("Creating:", this.refForm);
            // alert("Posting!");
    
            fetch('api/referees/create.php', {
                method:'POST',
                body: JSON.stringify(this.refForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.referee = json;
    
                //Reset the form
                this.refForm = {};
            });
        },
    },

    created() {
        this.fetchRefereeData();
        this.fetchGameData();
    }
}


Vue.createApp(Offer).mount('#offerApp')