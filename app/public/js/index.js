const Offer = {
    data() {
        return {
            "referee": [],
            selectedRef: null,
            selectedGame: null,
            selectedAssignment: null,
            selectUnassigned: false,
            gameForm:{},
            refForm:{},
            assignForm:{},
            "games": [],
            "assignments":[],
            "unassignedGames": []
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



        postAssignment(evt) {
            if(this.selectedAssignment === null) {
                this.postNewAssignment(evt);
            } else {
                this.postEditAssignment(evt);
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

        fetchUnassigned() {
            this.selectUnassigned = true;
            this.fetchUnassignedGames();
        },

        fetchUnassignedGames() {
            console.log("Fetching Unassigned Games");
            fetch('api/games/unassigned.php')

            .then( response => response.json())

            .then( (responseJson) => {
                console.log(responseJson);
                this.unassignedGames = responseJson;
            })
        },

        postEditGame(evt) {
            this.gameForm.game_id = this.selectedGame.game_id;

            console.log("Updating:", this.gameForm);
            // alert("Posting!");
    
            fetch('api/games/update.php', {
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
                this.resetGameForm();
            });
        },

        selectGame(o) {
            this.selectedGame = o;
            this.gameForm = Object.assign({}, this.selectedGame);
        },

        resetGameForm() {
            this.selectedGame = null;
            this.gameForm = {};
        },

        postEditAssignment(evt) {
            this.assignForm.referee_id = this.selectedRef.referee_id;
            this.assignForm.assignment_id = this.selectedAssignment.assignment_id;

            console.log("Updating:", this.assignForm);
            // alert("Posting!");
    
            fetch('api/assignment/update.php', {
                method:'POST',
                body: JSON.stringify(this.assignForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.assignments = json;
    
                //Reset the form
                this.resetAssignForm();
            });
        },

        selectAssignment(o) {
            this.selectedAssignment = o;
            this.assignForm = Object.assign({}, this.selectedAssignment);
        },

        resetAssignForm() {
            this.selectedAssignment = null;
            this.assignForm = {};
        },

        postEditRef(evt) {
            this.refForm.referee_id = this.selectedRef.referee_id;

            console.log("Updating:", this.refForm);
            // alert("Posting!");
    
            fetch('api/referees/update.php', {
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
                this.resetRefForm();
            });
        },

        selectRef(o) {
            this.selectedRef = o;
            this.refForm = Object.assign({}, this.selectedRef);
        },

        resetRefForm() {
            this.selectedRef = null;
            this.refForm = {};
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

        postNewAssignment(evt) {

            ///this.gameForm.game_id = this.selectedGame.game_id;
            console.log("Creating:", this.assignForm);
            // alert("Posting!");
    
            fetch('api/assignment/create.php', {
                method:'POST',
                body: JSON.stringify(this.assignForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.assignments = json;
    
                //Reset the form
                this.assignForm = {};
            });
        },

    },

    created() {
        this.fetchRefereeData();
        this.fetchGameData();
    }
}


Vue.createApp(Offer).mount('#offerApp')