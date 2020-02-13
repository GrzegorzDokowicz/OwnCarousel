# QuickSlide

QuickSlide is my own project of slider (Carousel). It was built with Javascript ES6, Jquery, Lodash and Webpack.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Installing

Firstly you need to clone this repository. To do this, click on green button "Clone or download", then copy link from it.
Next choose in console place where you want to clone this repository.
Then type in your console : 

```
git clone "Here you paste your copied link"
```

And press Enter. This should clone all files to your local machine. 
After this process is done, you need to download all dependencies. To do this type in your console. 

```
npm install
```

If you done it all succesfully, you should be ready to run this slider. 

To run it at live-preview type in console
```
npm run server
```

## Options

Slider is initialized with default options. If you want to change it, you just need to pass options as object to Carousel initialization. You will find it at './src/js/application/index.js'

| Param Name  | Default value | Value type | Description |
| ------------- | ------------- | ------------- | ------------- |
| slideInterval | 3000  | Number  | Content Cell  |
| step  | 1  | Number  | Content Cell  |
| mainSelector  | '.carousel'  | String  | Content Cell  |
| slideSelectors  | '.slideSelectors  | String  | Content Cell  |
| autoslide  | true  | Boolean  | Content Cell  |
| buttons  | true  | Boolean  | Content Cell  |
| nextButtonText  | 'Next'  | String  | Content Cell  |
| backButtonText  | 'Back'  | String  | Content Cell  |
| dots  | true  | Boolean  | Content Cell  |



## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds


## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details