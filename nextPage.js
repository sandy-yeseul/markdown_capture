
      // const nextBtn = await page.$('.Pagination:last-child');
      // await nextBtn.click();
      // return;


    // console.log("why it's not working")
    // const nextBtn = await page.$eval('.Pagination', (parentUlTag) =>{
    //     let nextBtnElem = parentUlTag.lastElementChild;
    //     if(nextBtnElem.tagName ==="DIV") {return false};
    //     console.log(`inside ${nextBtnElem}`)
    //     return nextBtnElem;
    // })
    // if(!nextBtn) return false;
    // nextBtn.click();

    //   for (var i = 0;  i <pageCount; i++) {
    //     const nextBtnIcon = await page.$(".RSGIcon-arrowRight");
    //     if(nextBtnIcon === null) {return false;} // NOTE to stop the loop and return false to index to stop the loop
    //     const nextBtn = await nextBtnIcon.getProperty("parentNode");
    //     nextBtn.asElement().click();
    //     await page.waitForTimeout(1000); // NOTE or else they repeat page
    //   }
    
    // const aTag = "A";
    // const divTag = "DIV";
    // for (let i = 0; i < pageCount; i++) {
    //   let isContinued = await page.evaluate(async () => {
    //     await page.waitForXPath(ResultCountXpath);
    //     let nextBtn = document.querySelector(".Pagination").lastElementChild;
    //     if (nextBtn.tagName === divTag) {
    //       return false;
    //     }
    //     nextBtn.click();
    //     return true;
    //   });
    //   if (!isContinued) return false;
    // }