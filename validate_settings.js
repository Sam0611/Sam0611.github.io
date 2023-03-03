function validate()
{
    var errors = 0;
    var i = 0;
    const tab = [];
    var nb_val = document.getElementsByTagName("input")[0].value;

    if (isNaN(nb_val) || !nb_val) //vérifie si l'entrée est un nombre
    {
        document.getElementsByTagName("span")[0].innerHTML = "Veuillez entrer un nombre";
        errors++;
        nb_val = 0;
    }
    else //vérification de la valeur
    {
        nb_val = parseInt(nb_val);
        if (nb_val < 3 || nb_val > 100)
        {
            document.getElementsByTagName("span")[0].innerHTML = "La valeur doit être comprise entre 3 et 100";
            errors++;
        }
        else
            document.getElementsByTagName("span")[0].innerHTML = "";
    }

    //vérifie si aucune option n'est cochée
    if (document.getElementById("c1").checked == false && document.getElementById("c2").checked == false)
    {
        document.getElementsByTagName("span")[1].innerHTML = "Vous devez selectionner une option";
        document.getElementsByTagName("span")[1].style.color = 'red';
        errors++;
    }

    //option générer valeurs aléatoires
    if (document.getElementById("c1").checked == true)
    {
        var min_val = document.getElementsByTagName("input")[3].value;
        var max_val = document.getElementsByTagName("input")[4].value;

        if (isNaN(min_val) || isNaN(max_val) || !min_val || !max_val) //vérifie si l'entrée est un nombre
        {
            document.getElementsByTagName("span")[2].innerHTML = "Veuillez remplir tous les champs par des nombres uniquement";
            errors++;
        }
        else //vérification des valeurs
        {
            min_val = parseInt(min_val);
            max_val = parseInt(max_val);

            if (min_val < -999 || min_val > 900)
            {
                document.getElementsByTagName("p")[0].innerHTML = "La valeur doit être comprise entre -999 et 900";
                errors++;
            }
            else
                document.getElementsByTagName("p")[0].innerHTML = "";

            if (max_val < -900 || max_val > 999)
            {
                document.getElementsByTagName("p")[1].innerHTML = "La valeur doit être comprise entre -900 et 999";
                errors++;
            }
            else
                document.getElementsByTagName("p")[1].innerHTML = "";

            if (errors == 0)
            {
                if (max_val - min_val <= nb_val)
                {
                    document.getElementsByTagName("span")[2].innerHTML = "La différence entre la valeur max et min doit être supérieure au nombre de valeurs";
                    errors++;
                }
                else
                    document.getElementsByTagName("span")[2].innerHTML = "";
            }
        }

        // si pas d'erreur, le tableau est rempli par des valeurs aléatoires
        if (errors == 0)
        {
            while (i < nb_val)
            {
                var random = Math.floor(Math.random() * (max_val - min_val)) + min_val;
                var j = 0;
                while (j < i && tab[j] != random)
                    j++;
                if (j == i)
                {
                    tab[i] = random;
                    i++; 
                }
            }
        }
    }

    //option générer valeurs manuellement
    if (document.getElementById("c2").checked == true)
    {
        var k = 0;
        var tmp;

        while (k < nb_val)
        {
            //verifie si des champs sont vides ou autre que des nombres
            tmp = document.getElementsByClassName("my_values")[k].value; 
            if (isNaN(tmp) || !tmp)
            {
                document.getElementsByTagName("span")[2].innerHTML = "Veuillez remplir tous les champs par des nombres uniquement";
                errors++;
                break;
            }
            else
                document.getElementsByTagName("span")[2].innerHTML = "";
            k++;
        }

        //verifie les doubles
        if (errors == 0)
        {
            k = 0;
            while (k < nb_val)
            {
                var l = 0;
                while (l < k)
                {
                    if (document.getElementsByClassName("my_values")[k].value == document.getElementsByClassName("my_values")[l].value)
                    {
                        errors++;
                        document.getElementsByTagName("span")[2].innerHTML = "Des valeurs sont en double !";
                        break;
                    }
                    l++;
                }
                k++;
            }
        }

        //remplir le tableau par les valeurs choisies
        if (errors == 0)
        {
            while (i < nb_val)
            {
                tab[i] = document.getElementsByClassName("my_values")[i].value;
                i++;
            }
        }
    }

    if (errors == 0)
    {
        i = 0;
        nb_tries = 0;
        document.getElementById("nb").innerHTML = "<div class='pile'>Pile A</div>";
        document.getElementById("nb2").innerHTML = "<div class='pile'>Pile B</div>";
        while (i < nb_val)
        {
            document.getElementById("nb").innerHTML += "<li class='val_A'>" + tab[i] + "</li>";
            i++;
        }
        document.getElementsByTagName("span")[2].innerHTML = "";
        document.getElementById("ct").innerHTML = nb_tries;
        close_settings();
        sort_check();
    }
}