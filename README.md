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

| Parameter Name  | Default value | Value type | Description |
| ------------- | ------------- | ------------- | ------------- |
| step  | 1  | Number  | Number of steps which slider takes at every run (click or autslide). NOTE! Step cannot be greater than your total slides number f.e. if you have 5 photos maximum step will be 4  |
| slideInterval | 3000  | Number  | Time between autoslides in ms |
| autoslide  | true  | Boolean  | If true autoslide is ON, if false then it is OFF |
| mainSelector  | '.carousel'  | String  | Main selector of your slider container. NOTE! If you change it, remember to change it in proper scss file too. |
| slideSelectors  | '.carousel__wrapper'  | String  | Selector of every slide wrapper. NOTE! If you change it, remember to change selector in proper scss file too. |
| buttons  | true  | Boolean  | If true buttons are ON, if false then their are OFF  |
| nextButtonText  | 'Next'  | String  | Text which will be rendered at next button  |
| backButtonText  | 'Back'  | String  | Text which will be rendered at back button  |
| dots  | true  | Boolean  | If true dots under sider are ON, if false then their are OFF  |



## Built With

* [Jquery](https://jquery.com/) - Popular JavaScript library.
* [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
* [Webpack](https://webpack.js.org/) - It is a static module bundler for modern JavaScript applications


## Authors

 **Grzegorz Dokowicz**