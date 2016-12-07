/**
 * Created with IntelliJ IDEA.
 * User: mediabox-2012-formateur
 * Date: 31/10/12
 * Time: 13:48
 * To change this template use File | Settings | File Templates.
 */
var mb = mb || {};

( function( $, mb )
{
    mb.views = mb.views || {};

    // Vues
    mb.views.ContactView = Backbone.View.extend
    (
        {
            tagName : "div",
            model   : null,
            template : _.template( $( "#contact-template" ).html() ),
            initialize: function()
            {
                this.listenTo( this.model, "change", this.render );
                this.render();
            },
            events :
            {
                "click .modif": "linkClicked"
            },
            render: function()
            {
                this.$el.html( this.template( this.model.toJSON() ) );
                return this;// chaining API
            },
            linkClicked : function( event )
            {
                console.log('Changement du texte en cours...');
                var contactRef = this;
                // Options Materialize
                $('.modal').modal({
                      complete: function ()
                        {
                            var newResume = $(".modal_area").val();
                            // Modification des valeurs du Model associé
                            contactRef.model.set
                            (
                                {
                                    "resume": newResume
                                }
                            );
                        } // Callback for Modal close
                });
                $('.modal_area').text(this.model.get('resume'));
                $('.modal_titre').text(this.model.get('titre'));
                $('.modal_area').modal('open');
                
                
            }
        }
    );

    mb.views.ContactListView = Backbone.View.extend
    (
        {
            collection : null,
            initialize : function()
            {
                // Liaison événementielle entre la collection et la vue
                //this.collection.on( "add", this.addContact, this );
                this.listenTo( this.collection, "add", this.addContact );
            },
            addContact : function( contact )
            {
                var contactView =  new mb.views.ContactView( { model : contact } );
                this.$el.append(  contactView.el );// child views
            }
        }
    );
})( jQuery, mb );