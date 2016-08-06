import { Meteor } from 'meteor/meteor';
import {Branches} from '../../imports/api/branches';

// var branches = [];

function dropBranch(branchName) {

    //console.log(Branches.find().count());


    var branch = Branches.findOne({ "branch": branchName })

    if (branch != null) {

        Branches.remove({ _id: branch._id });
    }


}

function dropBranches() {
    console.log("dropBranches");

    var branches = Branches.find({}).fetch();

    for (var i = 0; i < branches.length; i++) {
        console.log("Droping id: " + branches[i]._id);
        Branches.remove({ _id: branches[i]._id });
    }

}



export function loadBranches() {
    // Branches.remove({});
    if (Branches.find().count() === 0) {
        console.log("Meteor is starting loadBranches === 0")
        var temp = [
            {
                description: "Branch",
                address: "Address",
                town: "Town",
                county: "County",
                country: "Country",
                zip: "Postcode",
                imageAsData: "data:image/png;base64,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",

            },
        ];

        // for (var i = 0; i < temp.length; i++) {
        //     Branches.insert(temp[i]);
        // }

        for (var i = 0; i < temp.length; i++) {

            for (var j = 0; j < 20; j++) {
                var jString = "";
                if (j < 10) {
                    jString = "0" + j;
                }
                else {
                    jString = "" + j;
                }

                var o = new Object();
                o.description = temp[i].description + " " + jString;
                o.address = temp[i].address + " " + jString;
                o.town = temp[i].town + " " + jString;
                o.county = temp[i].county + " " + jString;
                o.country = temp[i].country + " " + jString;
                o.zip = temp[i].zip + " " + jString;
                o.imageAsData = temp[i].imageAsData;
                Branches.insert(o);
            }

        }

    }

};
