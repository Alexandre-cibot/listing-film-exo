/**
 * Created with IntelliJ IDEA.
 * User: mediabox-2012-formateur
 * Date: 31/10/12
 * Time: 14:04
 * To change this template use File | Settings | File Templates.
 */
var mb = mb || {};

(function( $, mb )
{
    //Données mockups correspondant à la liste des contacts
    var contacts;

    /**
     * Document ready event
     * alias de $(document).ready( function(){} );
     */
    $( function ()
    {
         $('.modal').modal();

         // Methode pour afficher les strings avec une majuscule si necessaire. 
         // Je l'utiliserai plus tard pour les titres et paragraphes. 
         String.prototype.ucFirst = function (){
            var str = this;
            if (str.length > 0) {
                str = str.toLowerCase();
                return str[0].toUpperCase() + str.substring(1);
            } 
            else {
                return str;
            }
        }
        /**
         *  Réception des données du serveur
         *
         */
        var main = function()
        {
            contacts = new mb.models.ContactsCollection();

            // Annule le message de chargement
            $( "#loading").remove();

            // Renseigne les éléments de la liste
            var contactListView = new mb.views.ContactListView( { el: "#contact_list", collection:contacts } );

            // On ajoute les données après lma création de la vue
            // pour que l'événement add soit utilisé
            for(film in stockFilms){
                contacts.add( new mb.models.ContactModel(stockFilms[film]) );
            }


//            $(document).on("datachange", function (event, data) {
//                if( data.values.length >= 2 )
//                {
//                    data.model.set
//                    (
//                        {
//                                        "prenom" : data.values[ 0 ],
//                                        "nom"    : data.values[ 1 ]
//                                    }
//                    )
//                }
//            })
        };


        $( "body" ).append( "<h3 id='loading'>Merci de patienter pendant le chargement des données</h3>" );
        // Active une pseudo requête async HTTP
       setTimeout( main, 2000 );

    });
})( jQuery, mb );