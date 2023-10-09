<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import Heat from "./lib/Heat.svelte";
  import Demo from "./lib/learn/Demo.svelte";
  import DemoTmp from "./lib/learn/DemoTmp.svelte";
</script>

<main>
  <!-- <div class="card"> -->
  <!--   <Counter /> -->
  <!-- </div> -->
  <!-- <div class="card pink"> -->
  <!--   <Heat /> -->
  <!-- </div> -->
  <Demo />
  <!-- <DemoTmp /> -->
</main>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .card {
    margin: 4rem;
  }

  .green {
    background-color: green;
  }

  .pink {
    background-color: pink;
  }
</style>
