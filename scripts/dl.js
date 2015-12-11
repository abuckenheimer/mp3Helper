var backgroundPageConnection = chrome.runtime.connect({
    name: "dlpage"
});
console.log('connecting as dlpage');

backgroundPageConnection.onMessage.addListener(function (dataset, sender) {
    console.log('dataset', dataset);

    var dlTable = $('#dlList').DataTable( {
        "paging":   false,
        "data": dataset,
        // "autoWidth": false,
        "order": [],
        "columns": [
            {   "title": "Track",
                "className": "editableText",
        },
            {   "title": "Author",
                "className": "editableText"
        },
            {   "title": "URL",
                // "className": "editableBox url"
                "className": "editableText url"
        },
            {   "title": "Download",
                "className": "dlBox",
                "defaultContent": "",
                "orderable": false
        }]
    } );
    $('.dlBox.sorting_disabled').on( 'click', function() {
        $(this).toggleClass('green');
        if ($(this).hasClass('green')) {
            $('tbody tr:not(.selected)').toggleClass('selected');
        }
        else {
            $('tbody .selected').toggleClass('selected');   
        }
    });
    $('#dlList tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
 
    $('#dlSelected').click( function () {
        var dldata = dlTable.rows('.selected').data();
        var fnames = [];
        var urls_downloaded = [];
        for (var item in dldata) {
            if (item <= dlTable.rows('.selected').data().length) {
                console.log('downloading:', dldata[item]);
                fname = dldata[item][0]+ ' - ' + dldata[item][1] + '.mp3';
                fnames.push(fname);
                urls_downloaded.push(dldata[item][2]);
                chrome.downloads.download({url:dldata[item][2], filename:fname});
            }
        }
        sender.postMessage(urls_downloaded);
        swal({title:'You have Downloaded:', text:fnames.join('\n'), type:'success'}, function() {window.close();});
    } );
    $('.editableText').editable(function(value,settings){
        var row = $(this).parents('tr').index();
        var col = $(this).index();
        dlTable.row(row).data()[col] = value;
        return(value);
    }, {type: 'text'});
    $('.editableBox').editable(function(value,settings){
        var row = $(this).parents('tr').index();
        var col = $(this).index();
        dlTable.row(row).data()[col] = value;
        return(value);
    }, {type: 'textarea'});
});