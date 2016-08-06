import { Meteor } from 'meteor/meteor';
import {MediaLibraries} from '../../imports/api/medialibraries';

// var mediaLibraries = [];

function dropMediaLibrary(mediaLibraryName) {

    //console.log(MediaLibraries.find().count());


    var mediaLibrary = MediaLibraries.findOne({ "mediaLibrary": mediaLibraryName })

    if (mediaLibrary != null) {

        MediaLibraries.remove({ _id: mediaLibrary._id });
    }


}

function dropMediaLibries() {
    console.log("dropMediaLibries");

    var mediaLibraries = MediaLibraries.find({}).fetch();

    for (var i = 0; i < mediaLibraries.length; i++) {
        console.log("Droping id: " + mediaLibraries[i]._id);
        MediaLibraries.remove({ _id: mediaLibraries[i]._id });
    }

}



export function loadMediaLibraries() {
    MediaLibraries.remove({});
    if (MediaLibraries.find().count() === 0) {
        console.log("Meteor is starting loadMediaLibraries === 0")
        var temp = [
            {

                'mediaLibrary': '/Html/Admir01.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Carlsberg.mp4" type="video/mp4"></video>',
                'heading': 'Carlsberg ',
                'detail': 'Carlsberg',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'atBranches': [1],
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 1,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': 1


            },
            {

                'mediaLibrary': '/Html/Admir02.html',
                'html': "<button style='width:100%;height:100%' onclick='alert(\"hi i am a real button\")'>Click Me 2</button>",
                'heading': 'heading',
                'detail': 'Sign2 Detail',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 10,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': null,
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 1,
                'channelId': 1,
                'mediaLibraryId': 2


            },
            {

                'mediaLibrary': '/Html/Admir02.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Fanta.mp4" type="video/mp4"></video>',
                'heading': 'Fanta',
                'detail': 'Fanta',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'atBranches': [2],
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 3,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': 3


            },
            {
                'mediaLibrary': '/Html/Admir021.html',
                'html': '<admir style="width:100%; height:100%;"></admir>',
                'heading': 'heading',
                'detail': 'Sign3 Detail',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 10,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': null,
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 3,
                'program': 'xxx.html',
                'customerId': 1,
                'channelId': 1,
                'mediaLibraryId': 3
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Jägermeister.mp4" type="video/mp4"></video>',
                'heading': 'Jägermeister',
                'detail': 'Jägermeister',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 0,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Elita01.mp4" type="video/mp4"></video>',
                'heading': 'Elita01',
                'detail': 'Elita01',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 110,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 0,
                'program': 'xxx.html',
                'customerId': 1,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {

                'mediaLibrary': '/Html/Admir02.html',
                'html': '<audio ><source src="media/Absolute Beginners - David Bowie.mp3" type="audio/mpeg"></audio>',
                'heading': 'David Bowie - Absolute Beginners',
                'detail': 'Sign8 Detail',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/music.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 4,
                'program': 'xxx.html',
                'customerId': 1,
                'channelId': 1,
                'mediaLibraryId': -1

            },
            {

                'mediaLibrary': '/Html/Admir02.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Strongbow.mp4" type="video/mp4"></video>',
                'heading': 'Strongbow',
                'detail': 'Strongbow',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 1,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': -1


            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Tudor_Brewery.mp4" type="video/mp4"></video>',
                'heading': 'Tudor_Brewery',
                'detail': 'Tudor_Brewery',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<img src="http://res.cloudinary.com/admirtv/image/upload/drajphxrcxhekz2sdk4l.jpg" width="100%" height="100%" />',
                'heading': 'Cloudinary',
                'detail': 'Cloudinary',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 10,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/image.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/KitKatBeep.mp4" type="video/mp4"></video>',
                'heading': 'Cloudinary Movie Kitkat',
                'detail': 'Cloudinary',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 28,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/NeilYoungOldMan.mp4" type="video/mp4"></video>',
                'heading': 'Cloudinary Movie Neil Young',
                'detail': 'Cloudinary',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 248,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/WP_20130309_001.mp4" type="video/mp4"></video>',
                'heading': 'Cloudinary Movie WP_20130309_001',
                'detail': 'Cloudinary',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 40,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 1,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Jet2.com_-_Happiness_is..._Family_TV_Advert.mp4" type="video/mp4"></video>',
                'heading': 'Cloudinary Movie Jet 2',
                'detail': 'Cloudinary',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 1,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Jet2.com_-_Happiness_is..._Family_TV_Advert.mp4" type="video/mp4"></video>',
                'heading': 'Cloudinary Movie Jet 2',
                'detail': 'Cloudinary',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 30,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 1,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 2,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/TomJerry.mp4" type="video/mp4"></video>',
                'heading': 'Cloudinary Tom & Jerry',
                'detail': 'Cloudinary',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 90,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 2,
                'channelId': 2,
                'mediaLibraryId': -1
            },
            {
                'mediaLibrary': '/Html/Admir022.html',
                'html': "<button style='width:100%;height:100%' onclick='alert(\"hi and i am a real button too!\")'>Click Me 4</button>",
                'heading': 'heading',
                'detail': 'Sign3 Detail',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 10,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': null,
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 2,
                'program': 'xxx.html',
                'customerId': 3,
                'channelId': 1,
                'mediaLibraryId': 3
            },
            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/Elita01.mp4" type="video/mp4"></video>',
                'heading': 'Elita01',
                'detail': 'Elita01',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 110,
                'days': [0, 1, 2, 3, 4, 5, 6],
                'times': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 0,
                'program': 'xxx.html',
                'customerId': 3,
                'channelId': 1,
                'mediaLibraryId': -1
            },

            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/TomJerry.mp4" type="video/mp4"></video>',
                'heading': 'Elita01',
                'detail': 'Elita01',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 110,
                'days': [0],
                'times': [3, 4, 5, 6, 7, 8, 22, 23, 24],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 0,
                'program': 'xxx.html',
                'customerId': -1,
                'channelId': 1,
                'mediaLibraryId': -1
            },

            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/TomJerry.mp4" type="video/mp4"></video>',
                'heading': 'Elita01',
                'detail': 'Elita01',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 110,
                'days': [1, 2],
                'times': [3, 4, 5, 6, 7, 8, 22, 23, 24],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 0,
                'program': 'xxx.html',
                'customerId': -1,
                'channelId': 1,
                'mediaLibraryId': -1
            },

            {
                'mediaLibrary': '/Html/Admir023.html',
                'html': '<video  style="object-fit:fill;"  width="100%" height="100%" ><source src="http://res.cloudinary.com/admirtv/video/upload/admir__TV/TomJerry.mp4" type="video/mp4"></video>',
                'heading': 'Elita01',
                'detail': 'Elita01',
                'programParameters': '{}',
                'createDate': new Date(),
                'duration': 110,
                'days': [3, 4],
                'times': [22, 23, 24],
                'height': 100,
                'width': 100,
                'image': 'media/video.png',
                'filepath': null,
                'tags': 'Menu',
                'sortOrder': 0,
                'program': 'xxx.html',
                'customerId': -1,
                'channelId': 1,
                'mediaLibraryId': -1
            },
        ];

        for (var i = 0; i < temp.length; i++) {
            temp[i].editColor = 'red';
            MediaLibraries.insert(temp[i]);
        }
    }

};
